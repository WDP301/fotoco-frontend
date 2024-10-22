import { CommentCard } from "./comment-card";

export default async function ReplyList() {
    const replies:[] = [];
    
    return (
         <>
            {replies.map((reply) => (
                <div key={reply.id} className="flex items-center w-full mb-5">
                    <CommentCard comment={reply} showIcon={true}/>
                </div>
            ))}
         </>   
    );
}