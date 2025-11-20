'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  id: number;
  email: string;
  name: string | null;
  posts: { id: number }[];
};

export function UserList({ users }: { users: User[] }) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editEmail, setEditEmail] = useState('');
  const [editName, setEditName] = useState('');
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setEditEmail(user.email);
    setEditName(user.name || '');
  };

  const handleUpdate = async (id: number) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: editEmail, name: editName }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      setEditingId(null);
      router.refresh();
    } catch (error) {
      console.error('Failed to update user:', error);
      alert('ユーザーの更新に失敗しました');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('本当にこのユーザーを削除しますか?')) {
      return;
    }

    setIsDeleting(id);
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      router.refresh();
    } catch (error) {
      console.error('Failed to delete user:', error);
      alert('ユーザーの削除に失敗しました');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800"
        >
          {editingId === user.id ? (
            <div className="space-y-3">
              <input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="w-full rounded border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
              />
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="名前"
                className="w-full rounded border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdate(user.id)}
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
              <div className="mb-2">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                  {user.name || '名無し'}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {user.email}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-zinc-500 dark:text-zinc-500">
                  投稿数: {user.posts.length}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
                  >
                    編集
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    disabled={isDeleting === user.id}
                    className="rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-200 disabled:opacity-50 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50"
                  >
                    {isDeleting === user.id ? '削除中...' : '削除'}
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
