import type { Comment as CommentType } from "../types";
import { AddNewComment } from "./add-new-comment";

interface CommentProps {
  comment: CommentType;
  onDelete: (id: string) => void;
}

export function Comment({ comment, onDelete }: CommentProps) {
  function handleDelete() {
    onDelete(comment.id);
  }

  return (
    <li>
      <h2>{new Date(comment.timestamp).toLocaleString()}</h2>
      <p>{comment.content}</p>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
      <AddNewComment parentId={comment.id} />
      {comment.children ? (
        <ol>
          {comment.children.map((childComment) => (
            <Comment
              key={comment.id}
              comment={childComment}
              onDelete={onDelete}
            />
          ))}
        </ol>
      ) : null}
    </li>
  );
}
