
import { ScrollArea } from "@/components/ui/scroll-area";
import ReplyCommentForm from "./reply-comment-form";
import { Separator } from "@/components/ui/separator"
import { CommentCard } from "./comment-card";
import ReplyCard from "./reply-list";


export default async function CommentList() {

  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1/comments');
  const comments:[] = await response.json();

  const replyResponse = await fetch('https://jsonplaceholder.typicode.com/posts/1/comments');
  const replies:[] = await replyResponse.json();

  return (
    <>
    <Separator className="mb-3" />
    <ScrollArea className=" md:h-[400px] lg:h-[300px] 2xl:h-[530px] overflow-auto">
      {comments.map((comment) => (
        <>
        <div key={comment.id} className="mb-4">
          <CommentCard comment={comment} />
          <ReplyCommentForm replyUsername={comment.email}/>
        </div>
          <ReplyCard replies={replies} />
        </>
      ))}
  </ScrollArea>
  <Separator className="mb-3"/>
  </>
  );
};

