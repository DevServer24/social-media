import type{ Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()



















interface SigninProps{
    email:string
    password:string
}
const SignInController = async(req:Request,res:Response) =>{
    try {
        const {email,password} = req.body as SigninProps
        const response = await prisma.user.findFirst({
            where:{
                email
            }
        })
        if(!response){
            return res.status(404).json({error:'User not Found'})
        }
        const findAccount = await bcrypt.compare(password,response.password);
        if (!findAccount) {
            return res.status(401).json({ error: 'Invalid credentials' });
          }
          return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error("Error during login:", error);
    return res.status(500).json({ error: 'Something went wrong' });
    }
}


export {SignInController}