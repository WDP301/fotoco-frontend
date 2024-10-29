import { Comment } from "@/lib/define";
import { CommentCard } from "./comment-card";

export default function ReplyList({replies}: {replies: Comment['replies']}) {
    
    return (
         <>
            {replies.map((reply) => (
                <div key={reply._id} className="flex items-center w-full">
                    <CommentCard comment={reply} showIcon={true}/>
                </div> 
            ))}
         </>   
    );
}