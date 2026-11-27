import express, { NextFunction, Request, Response } from 'express';
import { postController } from './post.controllers';
import { authMiddleware, UserRole } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware(UserRole.USER), postController.createPost);

export const postRouter = router;
