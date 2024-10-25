import { useRef } from "react";
import CommentForm from "./comment-form";

export default function ReplyCommentForm({
    replyTo,
    replyToId,
    photoId,
    isReplyOpen,
    onSuccess
}:{
    replyTo: string,
    replyToId: string,
    photoId: string,
    isReplyOpen: boolean,
    onSuccess?: () => void
}) {

    const commentFormRef = useRef<any>(null);

    if (isReplyOpen) {
        setTimeout(() => {
            commentFormRef.current?.focusTextArea();
        }, 0);
    }

    return isReplyOpen ? (
        <div className="flex items-center w-full pr-4 my-4">
            <div className="w-full">
                <CommentForm
                    photoId={photoId}
                    ref={commentFormRef}
                    showIcon={true}
                    replyTo={replyTo}
                    replyToId={replyToId}
                    onSuccess={onSuccess}
                />
            </div>
        </div>
    ):null
}
