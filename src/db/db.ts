import { addRxPlugin, createRxDatabase } from 'rxdb/plugins/core';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { getRxStorageLocalstorage } from 'rxdb/plugins/storage-localstorage';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';
import { commentSchema } from './comment.schema';

addRxPlugin(RxDBDevModePlugin);

export const db = await createRxDatabase({
    name: 'commentsdb',
    storage: wrappedValidateAjvStorage({
        storage: getRxStorageLocalstorage()
    })
});

await db.addCollections({
    comments: {
        schema: commentSchema
    }
});