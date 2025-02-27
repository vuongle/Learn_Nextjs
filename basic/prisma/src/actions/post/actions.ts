"use server";

import prisma from "@/prisma/db";
import { revalidatePath } from "next/cache";

export const createPost = async (data: FormData) => {
  await prisma.post.create({
    data: {
      title: data.get("title") as string,
      content: data.get("content") as string,
      author: {
        connect: {
          email: "user1@gmail.com",
        },
      },
    },
  });

  revalidatePath("/posts");
};
