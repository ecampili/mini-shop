import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IOrder } from '../../../interfaces';
import { Order } from '../../../models';

type Data = { message: string } | IOrder[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getOrders(req, res);
    default:
      res.status(400).json({ message: 'bad request' });
  }
  res.status(200).json({ message: 'Example' });
}

const getOrders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();

  const orders = await Order.find()
    .populate('user', 'name email')
    .sort({ createdAt: 'desc' })
    .lean();

  await db.disconnect();

  res.status(200).json(orders);
};
