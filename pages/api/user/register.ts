import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { User } from '../../../models'
import bcrypt from 'bcryptjs'
import {jwt, validations} from '../../../utils/'


type Data = 
|{message: string}
|{
    token:string;
    user:{
        email:string;
        name:string;
        role:string;
    }}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch(req.method){
       case 'POST':
           return registerUser(req,res)
        default:
            res.status(400).json({message:'ese endpoint no existe'})
   }
}

const  registerUser= async (req: NextApiRequest, res: NextApiResponse<Data>)=> {
    
    const {name='', email='',password=''} = req.body as {email:string,password:string,name:string}

   

    if(password.length <6 ){
        return res.status(400).json({message:'La contraseña debe de temer 6 o mas caracteres'})
    }
    if(name.length <3 ){
        return res.status(400).json({message:'El nombre debe de temer 3 o mas caracteres'})
    }

    //validar email
    if( !validations.isValidEmail(email)){
        return res.status(400).json({message:'El email es invalido'})
    }

    await db.connect()
    const user = await User.findOne({email})
    if(user){return res.status(400).json({message:'ya existe ese usuario'})}
   
   const newUser = new User({
       email:email.toLowerCase(),
       password:bcrypt.hashSync(password),
       role:'client',
       name,
   })

   try {
        await newUser.save({validateBeforeSave:true})
      
   } catch (error) {
       return res.status(500).json({message:'error de servidor'})
   }



   const {_id,role}= newUser

   const token = jwt.signToken(_id,email);
 
   return res.status(200).json({
       token:token ,
       user:{
           email,
           role,
           name
       }
   })
}
