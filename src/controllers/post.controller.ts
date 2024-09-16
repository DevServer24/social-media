import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface PostProps {
  post: string;
  comment: string;
  userId: string;
  likes?: number; // Optional likes field with a default value
}
 const createPost = async (req: Request, res: Response) => {
  try {
    const { post, comment, userId, likes = 0 } = req.body as PostProps;

    if (!post || !userId) {
      return res.status(400).json({ error: 'Post content and userId are required' });
    }

    // Create a new post with required fields, including `createdAt`
    const newPost = await prisma.post.create({
      data: {
        post,
        comment,
        userId,
        likes,
        createdAt: new Date(), // Provide the current date manually
      },
    });

    return res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error('Error creating post:', error);
    return res.status(500).json({ error: 'Something went wrong while creating the post' });
  }
};

export {createPost}
