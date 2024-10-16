import { CornerDownRight } from "lucide-react";
import { CommentCard } from "./comment-card";

export default async function ReplyCard({ replies }: { replies: [] }) {
    return (
        <>
            {replies.map((reply) => (
                <div key={reply.id} className="flex items-center w-full mb-5">
                    <CornerDownRight className="h-5 w-5 text-muted-foreground mr-2" />
                    <CommentCard comment={reply} />
                </div>
            ))}
        </>
    );
}