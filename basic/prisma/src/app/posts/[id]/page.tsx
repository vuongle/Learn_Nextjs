import prisma from "@/prisma/db";
import React from "react";

export default async function PostPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const id = await params.id;
  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });
  return (
    <div className="post-page">
      <h1 className="text-2xl font-bold">{post?.title}</h1>
      <p className="text-gray-700">{post?.content}</p>
      <p className="text-sm text-gray-500">
        Created at:{" "}
        {post?.createdAt
          ? new Date(post?.createdAt).toLocaleString("en-CA", {
              dateStyle: "short",
              timeStyle: "short",
            })
          : ""}
      </p>
      <p className="text-sm text-gray-500">
        Updated at:{" "}
        {post?.updatedAt
          ? new Date(post?.updatedAt).toLocaleString("en-CA", {
              dateStyle: "short",
              timeStyle: "short",
            })
          : ""}
      </p>
    </div>
  );
}
