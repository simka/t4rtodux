import type { Comment } from "./types";

export function sortCommentsRecursively(comment: Comment) {
  comment.children.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );
  comment.children.forEach(sortCommentsRecursively);
}
