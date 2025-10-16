import { useState } from "react";
import { db } from "../db";
import { Button } from "./button";

interface AddNewCommentProps {
  parentId?: string;
}

export function AddNewComment({ parentId }: AddNewCommentProps) {
  const [showForm, setShowForm] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const content = formData.get("content") as string;

    await db.comments.insert({
      id: crypto.randomUUID(),
      content,
      parentId: parentId ?? null,
      timestamp: new Date().toISOString(),
    });

    setShowForm(false);
  }

  if (showForm) {
    return (
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-2">
          <textarea
            autoFocus
            placeholder="Add your comment"
            name="content"
            className="w-full rounded-xl border border-stone-300 bg-white p-3 text-stone-800 placeholder-stone-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 focus:outline-none transition"
          />
          <Button type="submit" className="self-start">
            Post
          </Button>
        </div>
      </form>
    );
  }

  return (
    <Button type="button" onClick={() => setShowForm(true)}>
      Reply
    </Button>
  );
}
