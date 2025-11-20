import { prisma } from '@/lib/prisma';
import { UserForm } from '@/components/UserForm';
import { UserList } from '@/components/UserList';

// 動的レンダリングを強制（常に最新データを取得）
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    include: {
      posts: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  console.log('取得したユーザー数:', users.length);
  console.log('ユーザー一覧:', users.map(u => ({ id: u.id, name: u.name, email: u.email })));

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <main className="mx-auto max-w-6xl p-8">
        <h1 className="mb-8 text-4xl font-bold text-zinc-900 dark:text-zinc-50">
          ユーザー管理
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* ユーザー作成フォーム */}
          <section className="lg:col-span-1">
            <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              ユーザー作成
            </h2>
            <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
              <UserForm />
            </div>
          </section>

          {/* ユーザー一覧 */}
          <section className="lg:col-span-2">
            <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              ユーザー一覧 ({users.length}件)
            </h2>
            {users.length === 0 ? (
              <p className="text-zinc-600 dark:text-zinc-400">
                ユーザーがまだ登録されていません。
              </p>
            ) : (
              <UserList users={users} />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
