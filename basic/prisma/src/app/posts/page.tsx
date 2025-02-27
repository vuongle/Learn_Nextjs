import { createPost } from "@/actions/post/actions";
import prisma from "@/prisma/db";
import Link from "next/link";
import React from "react";

/**
 * Gets all posts from the database.
 *
 * @returns A list of {@link Post} objects, sorted in descending order by
 *          creation date and limited to the first 10 posts.
 */
const getAllPosts = async () => {
  const posts = await prisma.post.findMany({
    // where: {
    //   published: true,
    //   title: {
    //     contains: "test",
    //   },
    // },
    select: {
      id: true,
      title: true,
      content: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  return posts;
};

/**
 * Gets all posts of an user
 *
 * @returns A list of {@link Post} objects, sorted in descending order by
 *          creation date and limited to the first 10 posts.
 */
const getUserPosts = async () => {
  const user = await prisma.user.findUnique({
    where: {
      email: "user1@gmail.com",
    },
    include: {
      posts: true,
    },
  });

  return user?.posts;
};

export default async function PostsPage() {
  //   const posts = await getAllPosts();
  const posts = await getUserPosts();

  return (
    <>
      <h1 className="text-2xl font-bold">All Posts</h1>
      <div className="shadow-lg rounded-lg overflow-hidden">
        <ul className="flex flex-col gap-4 p-4 bg-gray-100">
          {posts.map((post) => (
            <li
              key={post.id}
              className="flex flex-col gap-2 p-4 border-b last:border-none"
            >
              <Link href={`/posts/${post.id}`}>
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-gray-700">{post.content}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <h1 className="text-2xl font-bold mt-8">Add New Post</h1>
      <form className="mt-4 space-y-4" action={createPost}>
        <label htmlFor="title" className="block">
          <span className="text-gray-700">Title</span>
          <input
            type="text"
            id="title"
            name="title"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </label>
        <label htmlFor="content" className="block">
          <span className="text-gray-700">Content</span>
          <textarea
            id="content"
            name="content"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </label>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-200 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </>
  );
}
