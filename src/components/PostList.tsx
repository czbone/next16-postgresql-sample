'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Post = {
  id: number;
  title: string;
  content: string | null;
  published: boolean;
  author: {
    id: number;
    name: string | null;
    email: string;
  };
};

export function PostList({ posts }: { posts: Post[] }) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editPublished, setEditPublished] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const handleEdit = (post: Post) => {
    setEditingId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content || '');
    setEditPublished(post.published);
  };

  const handleUpdate = async (id: number) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editTitle,
          content: editContent,
          published: editPublished,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      setEditingId(null);
      router.refresh();
    } catch (error) {
      console.error('Failed to update post:', error);
      alert('投稿の更新に失敗しました');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('本当にこの投稿を削除しますか?')) {
      return;
    }

    setIsDeleting(id);
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      router.refresh();
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('投稿の削除に失敗しました');
    } finally {
      setIsDeleting(null);
    }
  };

  const togglePublished = async (post: Post) => {
    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          published: !post.published,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to toggle published status');
      }

      router.refresh();
    } catch (error) {
      console.error('Failed to toggle published status:', error);
      alert('公開状態の変更に失敗しました');
    }
  };

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800"
        >
          {editingId === post.id ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full rounded border border-zinc-300 px-2 py-1 text-sm font-semibold dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
                placeholder="タイトル"
              />
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={3}
                className="w-full rounded border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
                placeholder="内容"
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`edit-published-${post.id}`}
                  checked={editPublished}
                  onChange={(e) => setEditPublished(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor={`edit-published-${post.id}`}
                  className="text-sm text-zinc-700 dark:text-zinc-300"
                >
                  公開する
                </label>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdate(post.id)}
                  className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                >
                  保存
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="rounded bg-zinc-300 px-3 py-1 text-sm text-zinc-700 hover:bg-zinc-400 dark:bg-zinc-600 dark:text-zinc-200"
                >
                  キャンセル
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-3">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                  {post.title}
                </h3>
                {post.content && (
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {post.content}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className="text-xs text-zinc-500 dark:text-zinc-500">
                    by {post.author.name || post.author.email}
                  </p>
                  <button
                    onClick={() => togglePublished(post)}
                    className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                      post.published
                        ? 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50'
                        : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600'
                    }`}
                  >
                    {post.published ? '公開' : '下書き'}
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
                  >
                    編集
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    disabled={isDeleting === post.id}
                    className="rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-200 disabled:opacity-50 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50"
                  >
                    {isDeleting === post.id ? '削除中...' : '削除'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
