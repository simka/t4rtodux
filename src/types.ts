import type { CommentDocType } from "./db";

export type Comment = CommentDocType & { children: Comment[] };
