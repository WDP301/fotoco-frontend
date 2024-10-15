import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CornerDownRight, SendHorizontal } from "lucide-react"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ReplyCommentForm(
    {
        setIsReplyOpen
    }: {
        setIsReplyOpen: (value: boolean) => void
    }
) {

    const router = useRouter();

    const [reply, setReply] = useState("");
    
    const handleReplySubmit = (e) => {
        e.preventDefault();
        console.log("Reply submitted");
        setIsReplyOpen(false);    
        router.refresh();
    }

    return (
        <div className="flex items-center">
            <CornerDownRight className="h-5 w-5 text-muted-foreground mr-2" />
            <form onSubmit={handleReplySubmit} className="py-2 relative w-full">
                <input
                type="text"
                className="text-sm border p-2 rounded w-full pr-10 bg-transparent"
                placeholder="Write a reply for John Doe..." // username you reply here
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

    )
}