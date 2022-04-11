import { IOrder } from '../interfaces/order';
import { isValidObjectId} from 'mongoose'
import { db } from '.';
import { Order } from '../models';


export const getOrderById = async(id:string):Promise<IOrder | null>=>{

    if( !isValidObjectId(id)){
        return null
    }

    await db.connect()
    const order = await Order.findById(id)
    await db.disconnect()

    if(!order){
        return null
    }
    // para hacer la serializacion
    return JSON.parse(JSON.stringify(order));
    


    return null;
}

export const getOrdersByUserId = async (userId:string) :Promise<IOrder[]> =>{

    if( !isValidObjectId(userId)){
        return []
    }

    await db.connect();

    const orders =  await Order.find({user:userId}).lean()

    await db.disconnect()

    return JSON.parse(JSON.stringify(orders))
}