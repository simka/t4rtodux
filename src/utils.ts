import type { Comment } from "./types";

export function sortCommentsByDate(a: Comment, b: Comment) {
  return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
}

export function sortNestedCommentsRecursively(comment: Comment) {
  comment.children.sort(sortCommentsByDate);
  comment.children.forEach(sortNestedCommentsRecursively);
}
