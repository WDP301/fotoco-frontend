import EmailList from "./comment-list"
import CommentForm from "./comment-form"
import { Separator } from "@/components/ui/separator"
import Post from "./post"


export function Right() {

  return (
    <div className="flex h-full flex-col">
        <div className="flex flex-1 flex-col">
          <Post />
          <Separator className="mt-auto" />
          <div className="mt-5">
            <CommentForm />
          </div>
          <div>
            <EmailList />
          </div>
          {/* <div className="p-8 text-center text-muted-foreground">
            No comments yet.
            </div> */}
        </div>
    </div>
  )
}