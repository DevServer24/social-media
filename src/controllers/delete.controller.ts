import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if the post exists
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Delete the post
    await prisma.post.delete({
      where: { id },
    });

    return res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return res.status(500).json({ error: 'Something went wrong while deleting the post' });
  }
};
