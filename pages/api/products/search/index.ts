import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    messsage: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(400).json({ messsage: 'Debe de especificar la busqueda' })
}