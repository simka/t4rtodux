import { Comment } from "./ui/comment"
import { db } from "./db/db";
import { AddNewComment } from "./ui/add-new-comment";
import { useEffect, useState } from "react";

export function App() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const subscription = db.comments.find().$.subscribe(docs => {
      setComments(docs.map(doc => doc.toJSON()))
    });

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  async function handleDelete(id: string) {
    const doc = await db.comments.findOne({ selector: { id } }).exec();
    if (doc) {
      await doc.remove();
    }
  }

  return (
    <main>
      <h1>comments</h1>
      <ol>
        {comments.map(comment => (
          <Comment key={comment.id} comment={comment} onDelete={handleDelete} />
        ))}
      </ol>
      <AddNewComment />
    </main>
  )
}