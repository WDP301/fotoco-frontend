import CommentList from "./comment-list"
import CommentForm from "./comment-form"
import { Separator } from "@/components/ui/separator"
import Post from "./post"
import { XIcon } from "lucide-react"


export function Right() {
  return (
    <div className="flex h-full flex-col">
      <Post />
      <Separator className="mb-3" />
      <CommentForm />
      <div className="flex-1">
          <CommentList />
      </div>
    </div>
  );
}