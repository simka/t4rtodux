import {
  toTypedRxJsonSchema,
  type ExtractDocumentTypeFromTypedRxJsonSchema,
  type RxJsonSchema,
  type RxCollection,
} from "rxdb";
import { addRxPlugin, createRxDatabase } from "rxdb/plugins/core";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { getRxStorageLocalstorage } from "rxdb/plugins/storage-localstorage";
import { wrappedValidateAjvStorage } from "rxdb/plugins/validate-ajv";

addRxPlugin(RxDBDevModePlugin);

const commentSchemaLiteral = {
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 100,
    },
    content: {
      type: "string",
    },
    timestamp: {
      type: "string",
      format: "date-time",
    },
    parentId: {
      type: ["string", "null"],
    },
  },
  required: ["id", "content", "timestamp"],
} as const;

const commentSchemaTyped = toTypedRxJsonSchema(commentSchemaLiteral);
export type CommentDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof commentSchemaTyped
>;
const commentSchema: RxJsonSchema<CommentDocType> = commentSchemaLiteral;
type CommentCollection = RxCollection<CommentDocType>;

type DatabaseCollections = {
  comments: CommentCollection;
};

export const db = await createRxDatabase<DatabaseCollections>({
  name: "commentsdb",
  storage: wrappedValidateAjvStorage({
    storage: getRxStorageLocalstorage(),
  }),
});

await db.addCollections({
  comments: {
    schema: commentSchema,
  },
});
