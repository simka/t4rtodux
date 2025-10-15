import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { db } from "../db/db";

export function AddNewComment() {
    const [showForm, setShowForm] = useState(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const values = Object.fromEntries(formData.entries());

        await db.comments.insert({
            id: uuidv4(),
            content: values.content,
            parentId: null,
            timestamp: new Date().toISOString()
        });

        setShowForm(false)
    }

    if (showForm) {
        return (
            <form onSubmit={handleSubmit}>
                <textarea placeholder="Add your comment" name="content" />
                <button type="submit">Post</button>
            </form>
        )
    }

    return (
        <button type="button" onClick={() => setShowForm(true)}>Reply</button>
    )

}