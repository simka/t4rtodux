export const commentSchema = {
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 100
        },
        content: {
            type: 'string'
        },
        timestamp: {
            type: 'string',
            format: 'date-time'
        },
        parentId: {
            type: ['string', 'null']
        },
    },
    required: ['id', 'content', 'timestamp']

}