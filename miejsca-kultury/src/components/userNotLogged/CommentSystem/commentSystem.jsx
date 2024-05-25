import { useState } from "react";

// Comment component
function Comment({ comment, addReply }) {
    const [reply, setReply] = useState("");
    const [showReplyInput, setShowReplyInput] = useState(false);

    const handleReply = () => {
        addReply(reply);
        setReply("");
        setShowReplyInput(false);
    };

    return (
        <div style={{ marginLeft: '20px', marginTop: '10px' }}>
            <div>{comment.text}</div>
            <button onClick={() => setShowReplyInput(!showReplyInput)}>Odpowiedz</button>
            {showReplyInput && (
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                    <input 
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        placeholder="Dodaj odpowiedź..." 
                        className="commentInput"
                    />
                    <button onClick={handleReply} className="commentButtonSend" style={{ marginLeft: '10px' }}>Wyślij</button>
                </div>
            )}
            {comment.replies && comment.replies.map((reply, index) => (
                <Comment key={index} comment={reply} addReply={(newReply) => {
                    const updatedReplies = [...comment.replies, { text: newReply, replies: [] }];
                    comment.replies = updatedReplies;
                }} />
            ))}
        </div>
    );
}

// Comment section function
function CommentSystem() {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    const addComment = () => {
        setComments([...comments, { text: newComment, replies: [] }]);
        setNewComment("");
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Dodaj komentarz..." 
                    className="commentInput"
                />
                <button onClick={addComment} className="commentButtonSend" style={{ marginLeft: '10px' }}>Wyślij</button>
            </div>
            <div>
                {comments.map((comment, index) => (
                    <Comment key={index} comment={comment} addReply={(reply) => {
                        const updatedComments = [...comments];
                        updatedComments[index].replies.push({ text: reply, replies: [] });
                        setComments(updatedComments);
                    }} />
                ))}
            </div>
        </div>
    );
}

export default CommentSystem;