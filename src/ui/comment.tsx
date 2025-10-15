interface CommentProps {
    comment: {}
    onDelete: (id: string) => void;
}

export function Comment({ comment, onDelete }: CommentProps) {

    function handleDelete() {
        onDelete(comment.id)
    }

    return (
        <li>
            <h2>{comment.timestamp}</h2>
            <p>{comment.content}</p>
            <button type='button' onClick={handleDelete}>Delete</button>
        </li>
    )
}