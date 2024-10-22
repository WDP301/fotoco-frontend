import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import CommentForm from "./comment-form";

export default function ReplyCommentForm({replyTo}:{replyTo: string}) {

    const router = useRouter();
    const [isReplyOpen, setIsReplyOpen] = useState(false);
    const commentFormRef = useRef<any>(null);

    const handleReplyClick = () => {
        setIsReplyOpen(true);
        setTimeout(() => {
            commentFormRef.current?.focusTextArea();
        }, 0);
    }
    
    const handleReplySubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Reply submitted");
        setIsReplyOpen(false);    
        router.refresh();
    }

    return (
        <>
            {!isReplyOpen ? (
                <div className="text-xs py-1 text-gray-400 cursor-pointer" onClick={handleReplyClick}>
                Reply
                </div>
            ) : (
                <div className="flex items-center w-full pr-4 my-4">
                    <div className="w-full">
                        <CommentForm ref={commentFormRef} showIcon={true} replyTo={replyTo}/>
                    </div>
                </div>
            )}
        </>
    )
}
