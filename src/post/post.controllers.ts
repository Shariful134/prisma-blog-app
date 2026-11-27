import { Request, Response } from 'express';
import { postService } from './post.services';

const createPost = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        error: 'Unauthorized',
      });
    }
    const result = await postService.creatPost(req.body, user.id);
    res.status(201).json({
      message: 'Post created successfully',
      data: result,
    });
  } catch (err) {
    console.error(err);

    res.status(400).json({
      error: 'Post creation failed',
      details: err instanceof Error ? err.message : err,
    });
  }
};

export const postController = {
  createPost,
};
