import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "../db/db";

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
      id: uuidv4(),
      content,
      parentId: parentId ?? null,
      timestamp: new Date().toISOString(),
    });

    setShowForm(false);
  }

  if (showForm) {
    return (
      <form onSubmit={handleSubmit}>
        <textarea placeholder="Add your comment" name="content" />
        <button type="submit">Post</button>
      </form>
    );
  }

  return (
    <button type="button" onClick={() => setShowForm(true)}>
      Reply
    </button>
  );
}
