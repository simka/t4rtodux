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
    <li className="my-8">
      <div className="flex space-between space-x-3 items-center">
        <h2 className="text-xs font-medium">
          {new Date(comment.timestamp).toLocaleString()}
        </h2>
        <button
          type="button"
          className="px-3 py-1 cursor-pointer rounded-lg hover:bg-stone-300 transition"
          onClick={handleDelete}
        >
          🗑️
        </button>
      </div>
      <p className="max-w-[80ch] my-2">{comment.content}</p>
      <AddNewComment parentId={comment.id} />
      {comment.children ? (
        <ol className="ml-8">
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
