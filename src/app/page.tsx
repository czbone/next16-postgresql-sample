import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <main className="mx-auto max-w-6xl p-8">
        <h1 className="mb-8 text-4xl font-bold text-zinc-900 dark:text-zinc-50">
          Prisma サンプルアプリケーション
        </h1>

        <div className="mb-8 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <h2 className="mb-2 text-lg font-semibold text-blue-900 dark:text-blue-100">
            🚀 セットアップ手順
          </h2>
          <ol className="list-decimal space-y-1 pl-6 text-sm text-blue-800 dark:text-blue-200">
            <li>.env ファイルに DATABASE_URL を設定してください</li>
            <li>
              <code className="rounded bg-blue-100 px-1 dark:bg-blue-800">
                pnpm prisma generate
              </code>{' '}
              でクライアントを生成
            </li>
            <li>
              <code className="rounded bg-blue-100 px-1 dark:bg-blue-800">
                pnpm prisma db push
              </code>{' '}
              でデータベースをセットアップ
            </li>
          </ol>
        </div>

        {/* ナビゲーションカード */}
        <div className="grid gap-6 md:grid-cols-2">
          <Link
            href="/users"
            className="group rounded-lg border border-zinc-200 bg-white p-6 transition-all hover:border-blue-500 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-blue-400"
          >
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                ユーザー管理
              </h2>
              <span className="text-2xl transition-transform group-hover:translate-x-1">
                →
              </span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400">
              ユーザーの作成、編集、削除を行います
            </p>
          </Link>

          <Link
            href="/posts"
            className="group rounded-lg border border-zinc-200 bg-white p-6 transition-all hover:border-blue-500 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-blue-400"
          >
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                投稿管理
              </h2>
              <span className="text-2xl transition-transform group-hover:translate-x-1">
                →
              </span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400">
              投稿の作成、編集、削除を行います
            </p>
          </Link>
        </div>

        {/* API エンドポイント情報 */}
        <section className="mt-8 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
          <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            API エンドポイント
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                GET /api/users
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                全ユーザーを取得
              </p>
            </div>
            <div>
              <h3 className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                POST /api/users
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                新規ユーザーを作成 (body: {'{'}email, name{'}'})
              </p>
            </div>
            <div>
              <h3 className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                GET /api/posts
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                全投稿を取得
              </p>
            </div>
            <div>
              <h3 className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                POST /api/posts
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                新規投稿を作成 (body: {'{'}title, content, authorId, published
                {'}'})
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
