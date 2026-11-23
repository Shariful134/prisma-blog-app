import express from "express"
import { postController } from "./post.controllers";
const router = express.Router();

router.post("/", postController.createPost)


export const postRouter = router