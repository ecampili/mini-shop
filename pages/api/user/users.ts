import type { NextApiRequest, NextApiResponse } from 'next'
import { IUser } from '../../../interfaces'
import { User } from '../../../models'

type Data = 
|{message: string}
|{users:IUser[]}

export default async function handler  (req: NextApiRequest, res: NextApiResponse<Data>) {
   
    const users = await User.find()
    res.status(200).json({users})

}