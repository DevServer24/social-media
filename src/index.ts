import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import { SignUpController } from './controllers/sign-up.controllers';
import { SignInController } from './controllers/sign-in.controllers';
import { createPost } from './controllers/post.controller';

import { deletePost } from './controllers/delete.controller';
import { AllowedOrigins } from './library/alloweOrigins';
dotenv.config();

const server = express();
const port = process.env.PORT || 4000;
server.use(express.json());
server.use(cors(
    {
        origin: '*', // Allows all origins
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
        allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    }
));
server.use(helmet());









server.get('/',() =>{

});
server.post('/sign-up',SignUpController);
server.post('/sign-in',SignInController);
server.post('/create-post',createPost);
server.post('/delete-post',deletePost)
server.listen(port,() =>{
    console.log(`Server Connected to localhost:${port}`)
});