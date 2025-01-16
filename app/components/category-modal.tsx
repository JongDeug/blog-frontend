"use client";

import { useState } from "react";

interface Category {
  id: string;
  name: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onAdd: (name: string) => void;
  onEdit: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}

export default function CategoryModal({
  isOpen,
  onClose,
  categories,
  onAdd,
  onEdit,
  onDelete,
}: Props) {
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">카테고리 관리</h2>

        {/* Add new category */}
        <div className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="새 카테고리"
              className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button
              onClick={() => {
                if (newCategory.trim()) {
                  onAdd(newCategory);
                  setNewCategory("");
                }
              }}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              추가
            </button>
          </div>
        </div>

        {/* Category list */}
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center gap-2">
              {editingId === category.id ? (
                <>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <button
                    onClick={() => {
                      onEdit(category.id, editName);
                      setEditingId(null);
                    }}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    저장
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1 dark:text-white">
                    {category.name}
                  </span>
                  <button
                    onClick={() => {
                      setEditingId(category.id);
                      setEditName(category.name);
                    }}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
                  >
                    수정
                  </button>
                </>
              )}
              <button
                onClick={() => onDelete(category.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                삭제
              </button>
            </div>
          ))}
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500 w-full"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
