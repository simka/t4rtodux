export function buildCommentTree(comments) {
    const map = new Map();
    comments.forEach(c => (map[c.id] = { ...c, children: [] }));
    const roots = [];

    comments.forEach(c => {
        if (c.parentId) {
            map[c.parentId]?.children.push(map[c.id]);
        } else {
            roots.push(map[c.id]);
        }
    });

    return roots;
}