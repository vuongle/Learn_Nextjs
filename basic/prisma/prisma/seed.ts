import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const initPost: Prisma.PostCreateInput[] = [
  {
    title: "Post 1",
    content: "Content 1",
    author: {
      connectOrCreate: {
        where: {
          email: "user1@gmail.com",
        },
        create: {
          email: "user1@gmail.com",
          name: "User 1",
          role: "user",
          password: "123",
        },
      },
    },
  },
];

async function main() {
  console.log("Seeding database STARTED...");
  for (const p of initPost) {
    const post = await prisma.post.create({ data: p });
    console.log(`Created post: ${post.id}`);
  }
  console.log("Seeding database DONE");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
