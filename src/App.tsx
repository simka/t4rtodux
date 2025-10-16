import { useEffect, useState } from "react";

import { AddNewComment } from "./ui/add-new-comment";
import { Comment } from "./ui/comment";
import { db } from "./db";
import { sortCommentsByDate, sortNestedCommentsRecursively } from "./utils";
import type { Comment as CommentType } from "./types";

export function App() {
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    const subscription = db.comments.find().$.subscribe((docs) => {
      const allComments = docs.map((doc) => doc.toJSON());

      const map = {} as Record<string, CommentType>;
      allComments.forEach((comment) => {
        map[comment.id] = { ...comment, children: [] };
      });

      const rootComments = [] as CommentType[];
      allComments.forEach((comment) => {
        if (comment.parentId && map[comment.parentId]) {
          map[comment.parentId].children.push(map[comment.id]);
        } else {
          rootComments.push(map[comment.id]);
        }
      });

      rootComments.sort(sortCommentsByDate);
      rootComments.forEach(sortNestedCommentsRecursively);

      setComments(rootComments);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleDelete(id: string) {
    const doc = await db.comments.findOne({ selector: { id } }).exec();
    if (doc) {
      await doc.remove();
    }
  }

  return (
    <main className="w-4xl mx-auto">
      <h1 className="text-5xl mb-5">Comments</h1>
      <AddNewComment />
      <ol>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} onDelete={handleDelete} />
        ))}
      </ol>
    </main>
  );
}
