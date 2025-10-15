import type { CommentDocType } from "./db/db";

export type Comment = CommentDocType & { children: Comment[] }