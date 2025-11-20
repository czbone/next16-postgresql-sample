import { prisma } from '@/lib/prisma';
import { PostForm } from '@/components/PostForm';
import { PostList } from '@/components/PostList';

// 動的レンダリングを強制（常に最新データを取得）
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <main className="mx-auto max-w-6xl p-8">
        <h1 className="mb-8 text-4xl font-bold text-zinc-900 dark:text-zinc-50">
          投稿管理
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* 投稿作成フォーム */}
          <section className="lg:col-span-1">
            <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              投稿作成
            </h2>
            <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
              <PostForm />
            </div>
          </section>

          {/* 投稿一覧 */}
          <section className="lg:col-span-2">
            <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              投稿一覧 ({posts.length}件)
            </h2>
            {posts.length === 0 ? (
              <p className="text-zinc-600 dark:text-zinc-400">
                投稿がまだありません。
              </p>
            ) : (
              <PostList posts={posts} />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
