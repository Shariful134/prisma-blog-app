import { Post } from "../../generated/prisma/client";
import { prisma } from "../lib/prisma";


// Omit is Utility Type 
const creatPost = async (data: Omit<Post, 'id' | 'createdAt' | 'updatedAT'>) => {
    const result = await prisma.post.create({
        data
    })
    return result
}

export const postService = {
    creatPost
}