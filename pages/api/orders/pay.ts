import { DataArray } from '@mui/icons-material';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IPaypal } from '../../../interfaces';
import { Order } from '../../../models';

type Props = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Props>
) {
  switch (req.method) {
    case 'POST':
      return payOrder(req, res);
    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const getPayPalBeareToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT}:${PAYPAL_SECRET}`,
    'utf-8'
  ).toString('base64');

  const body = new URLSearchParams('grant_type=client_credentials');

  try {
    const { data } = await axios.post(
      process.env.PAYPAL_OAUTH_URL || '',
      body,
      {
        headers: {
          Authorization: `Basic ${base64Token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    } else {
      console.log(error);
    }

    return null;
  }
};

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Props>) => {
//TODO:validar session del usuario
//TODO: validar mongoID



  //obtener token de acceso
  const paypalBearerToken = await getPayPalBeareToken();
  if (!paypalBearerToken) {
    return res.status(400).json({ message: 'No se pudo generar token paypal' });
  }

  // capturamos nuestro datos enviados en el body
  const { transactionId = '', orderId = '' } = req.body;

  // se hace la peticion a paypal
  const { data } = await axios.get<IPaypal.PayPalOrderStatusResponse>(
    `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`,
    {
      headers: {
        Authorization: `Bearer ${paypalBearerToken}`,
      },
    }
  );

  // no esta pagado
  if (data.status !== 'COMPLETED') {
    return res.status(401).json({ message: 'Orden no reconocida' });
  }

  await db.connect();
  // buscar la orden en nuestra base de datos
  const dbOrder = await Order.findById(orderId);

  if (!dbOrder) {
    res.status(400).json({ message: 'orden no existe en la base de datos' });
  }

  // compara el total de nuestra orden con la de paypal
  if (dbOrder!.total !== Number(data.purchase_units[0].amount.value)) {
    await db.disconnect();
    res
      .status(400)
      .json({ message: ' Los montos de paypal y nuestra orden no coinciden' });
  }

  dbOrder!.transactionId = transactionId;
  dbOrder!.isPaid = true;
  await dbOrder!.save();

  await db.disconnect();

  return res.status(200).json({ message: 'Orden pagada' });
};
