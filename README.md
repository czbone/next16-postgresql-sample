# Next.js + Prisma + PostgreSQL サンプルアプリケーション

Next.js 16、Prisma、PostgreSQLを使用したフルスタックWebアプリケーションのサンプルプロジェクトです。ユーザー管理と投稿管理の基本的なCRUD操作を実装しています。

## 🎯 概要

このプロジェクトは、モダンなWeb開発のベストプラクティスを示すサンプルアプリケーションです：

- **ページ分割**: ユーザー管理と投稿管理を別ページで構成
- **フルスタック**: フロントエンドからデータベースまで一貫した型安全性
- **REST API**: Next.js App RouterによるAPIエンドポイント
- **レスポンシブUI**: Tailwind CSSによるモダンなデザイン

## 📸 画面イメージ

![アプリケーション画面](https://github.com/user-attachments/assets/859f4633-6b41-4104-b839-634ca613afa8)

## 🚀 技術スタック

- **Next.js 16** - React App Router、Server Components
- **TypeScript** - 完全な型安全性
- **Prisma 7** - 次世代ORM、型安全なデータベースクライアント
- **PostgreSQL** - リレーショナルデータベース
- **Tailwind CSS 4** - ユーティリティファーストCSS
- **pnpm** - 高速パッケージマネージャー

## 📊 データベースモデル

### User (ユーザー)
- `id` - 自動採番ID
- `email` - メールアドレス (必須、ユニーク)
- `name` - 名前 (オプション)
- `posts` - 投稿との1対多リレーション
- `createdAt` - 作成日時

### Post (投稿)
- `id` - 自動採番ID
- `title` - タイトル (必須)
- `content` - 本文 (オプション)
- `published` - 公開状態
- `authorId` - 著者ID (User への外部キー)
- `author` - ユーザーとの多対1リレーション
- `createdAt` - 作成日時
- `updatedAt` - 更新日時

## 🛠️ セットアップ手順

### 1. リポジトリをクローン

```bash
git clone <repository-url>
cd next-postgres-sample
```

### 2. 依存関係をインストール

```bash
pnpm install
```

### 3. 環境変数を設定

`.env.example` をコピーして `.env` ファイルを作成し、PostgreSQL の接続文字列を設定してください:

```bash
cp .env.example .env
```

`.env` ファイルを編集:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
```

**ローカル開発の例:**
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/prisma_sample?schema=public"
```

### 4. Prismaクライアントを生成

```bash
pnpm db:generate
```

### 5. データベースをセットアップ

```bash
# マイグレーションを作成・適用
pnpm db:migrate
```

### 6. サンプルデータを投入（オプション）

```bash
pnpm db:seed
```

これにより、2人のユーザーと3件の投稿が作成されます。

### 7. 開発サーバーを起動

```bash
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションにアクセスできます。

### VS Codeでのデバッグ実行

F5キーまたは「実行とデバッグ」から以下の構成を選択できます：
- **Next.js: debug server-side** - サーバーサイドデバッグ
- **Next.js: debug client-side** - クライアントサイドデバッグ
- **Next.js: debug full stack** - フルスタックデバッグ

## 📱 アプリケーション機能

### ページ構成

- **`/`** - トップページ（各機能へのナビゲーション）
- **`/users`** - ユーザー管理ページ
  - ユーザー一覧表示
  - 新規ユーザー作成
  - ユーザー編集・削除
- **`/posts`** - 投稿管理ページ
  - 投稿一覧表示
  - 新規投稿作成
  - 投稿編集・削除
  - 公開/非公開の切り替え

### 主な機能

- ✅ ユーザーのCRUD操作(作成・読込・更新・削除)
- ✅ 投稿のCRUD操作
- ✅ ユーザーと投稿のリレーション管理
- ✅ リアルタイムでのデータ更新
- ✅ レスポンシブデザイン(モバイル対応)
- ✅ ダークモード対応
- ✅ 型安全なAPI通信

## 🔌 API エンドポイント

### ユーザーAPI

#### `GET /api/users`
全ユーザーを取得（投稿数を含む）

**レスポンス:**
```json
[
  {
    "id": 1,
    "email": "user@example.com",
    "name": "ユーザー名",
    "posts": [],
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
]
```

#### `POST /api/users`
新規ユーザーを作成

**リクエストボディ:**
```json
{
  "email": "user@example.com",
  "name": "ユーザー名"
}
```

#### `PATCH /api/users/[id]`
ユーザー情報を更新

#### `DELETE /api/users/[id]`
ユーザーを削除

### 投稿API

#### `GET /api/posts`
全投稿を取得（著者情報を含む）

**レスポンス:**
```json
[
  {
    "id": 1,
    "title": "投稿タイトル",
    "content": "投稿内容",
    "published": true,
    "author": {
      "id": 1,
      "name": "ユーザー名",
      "email": "user@example.com"
    },
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
]
```

#### `POST /api/posts`
新規投稿を作成

**リクエストボディ:**
```json
{
  "title": "投稿タイトル",
  "content": "投稿内容",
  "authorId": 1,
  "published": true
}
```

#### `PATCH /api/posts/[id]`
投稿を更新

#### `DELETE /api/posts/[id]`
投稿を削除

## 📁 プロジェクト構造

```
next-postgres-sample/
├── .vscode/
│   └── launch.json              # VS Code デバッグ設定
├── prisma/
│   ├── schema.prisma            # Prismaスキーマ定義
│   └── seed.ts                  # サンプルデータ投入スクリプト
├── src/
│   ├── app/
│   │   ├── layout.tsx           # ルートレイアウト（ナビゲーション含む）
│   │   ├── page.tsx             # トップページ
│   │   ├── users/
│   │   │   └── page.tsx         # ユーザー管理ページ
│   │   ├── posts/
│   │   │   └── page.tsx         # 投稿管理ページ
│   │   └── api/
│   │       ├── users/
│   │       │   ├── route.ts     # ユーザー一覧・作成API
│   │       │   └── [id]/
│   │       │       └── route.ts # ユーザー詳細・更新・削除API
│   │       └── posts/
│   │           ├── route.ts     # 投稿一覧・作成API
│   │           └── [id]/
│   │               └── route.ts # 投稿詳細・更新・削除API
│   ├── components/
│   │   ├── Navigation.tsx       # ヘッダーナビゲーション
│   │   ├── UserForm.tsx         # ユーザー作成フォーム
│   │   ├── UserList.tsx         # ユーザー一覧コンポーネント
│   │   ├── PostForm.tsx         # 投稿作成フォーム
│   │   └── PostList.tsx         # 投稿一覧コンポーネント
│   ├── lib/
│   │   └── prisma.ts            # Prismaクライアント設定
│   └── generated/
│       └── prisma/              # 生成されたPrismaクライアント
├── .env                         # 環境変数（gitignore対象）
├── .env.example                 # 環境変数のサンプル
├── package.json                 # プロジェクト設定
├── prisma.config.ts             # Prisma設定
├── tsconfig.json                # TypeScript設定
├── next.config.ts               # Next.js設定
├── tailwind.config.ts           # Tailwind CSS設定
└── README.md                    # このファイル
```

## 🛠️ 便利なコマンド

### 開発

```bash
pnpm dev              # 開発サーバーを起動
pnpm build            # 本番ビルド
pnpm start            # 本番サーバーを起動
pnpm lint             # ESLintでコードチェック
```

### Prisma

```bash
pnpm db:studio          # Prisma Studio(GUIデータベースブラウザ)を起動
pnpm db:generate        # Prismaクライアントを生成
pnpm db:migrate         # マイグレーションを作成・適用
pnpm db:reset           # データベースをリセット
pnpm db:seed            # サンプルデータを投入
```

## 🎨 技術的な特徴

### Prisma による型安全なデータベース操作

- スキーマファーストな開発
- 自動生成される完全な型定義
- リレーションの自動処理
- トランザクション対応

### Next.js App Router

- Server Components によるサーバーサイドレンダリング
- ファイルベースルーティング
- API Routes による REST API
- レイアウトの共通化

### モダンなUI/UX

- Tailwind CSS による高速開発
- レスポンシブデザイン
- ダークモード対応
- インタラクティブなUI

## 📚 参考リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)

## 📝 ライセンス

MIT License
