import { CornerDownRight, SendHorizontal } from "lucide-react"
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ReplyCommentFormProps {
    replyUsername: string;
  }

export default function ReplyCommentForm(
    { replyUsername }: ReplyCommentFormProps
) {

    const router = useRouter();

    const [reply, setReply] = useState("");
    const [isReplyOpen, setIsReplyOpen] = useState(false);

    const handleReplyClick = () => {
        setIsReplyOpen(true);
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
                <div className="flex items-center w-full pr-4">
                <CornerDownRight className="h-5 w-5 text-muted-foreground mr-2" />
                <form onSubmit={handleReplySubmit} className="py-2 relative w-full">
                    <input
                        type="text"
                        className="text-sm border p-2 pr-8 rounded w-full bg-transparent"
                        placeholder={`Write a reply for ${replyUsername}...`}
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                    />
                    {reply.trim() && (
                        <button 
                        type="submit" 
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary"
                        >
                        <SendHorizontal className="h-5 w-5" />
                        </button>
                    )}
                </form>
            </div>
            )}
        </>
    )
}
