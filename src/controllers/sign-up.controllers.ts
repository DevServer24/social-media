import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()




interface SignupProps {
    email: string
    name: string
    password: string
}
const SignUpController = async (req: Request, res: Response) => {



    try {
        const { email, name, password } = req.body as SignupProps
        const hashedPassword = await bcrypt.hash(password, 10);
        const response = await prisma.user.create({




            data: {
                email, name, password: hashedPassword
            }
        });
        if (response) {
            return res.json({ message: 'succes' }).status(201)
        }
    } catch (error) {
            return res.json({message:'error creating account'}).status(500)
    }
}

export {SignUpController}