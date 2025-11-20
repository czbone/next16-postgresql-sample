import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // ユーザーを作成
  const user1 = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      name: 'アリス',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'bob@example.com',
      name: 'ボブ',
    },
  });

  console.log(`Created users: ${user1.name}, ${user2.name}`);

  // 投稿を作成
  const post1 = await prisma.post.create({
    data: {
      title: 'Prismaの使い方',
      content: 'Prismaは素晴らしいORMツールです。TypeScriptとの統合が優れています。',
      published: true,
      authorId: user1.id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: 'Next.js 15の新機能',
      content: 'Next.js 15では多くの新機能が追加されました。',
      published: true,
      authorId: user1.id,
    },
  });

  const post3 = await prisma.post.create({
    data: {
      title: '下書き投稿',
      content: 'これはまだ公開されていない下書きです。',
      published: false,
      authorId: user2.id,
    },
  });

  console.log(
    `Created posts: ${post1.title}, ${post2.title}, ${post3.title}`
  );

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
