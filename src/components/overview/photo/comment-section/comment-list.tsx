import ReplyCommentForm from "./reply-comment-form";
import { Separator } from "@/components/ui/separator"
import { CommentCard } from "./comment-card";
import ReplyList from "./reply-list";
import SortSelect from "@/components/shared/sort-select";


export default function CommentList() {

  const comments:[] = [];
  const sortOptions = [
    {
      label: "Newest",
      value: "newest",
      field: "sort",
    },
    {
      label: "Oldest",
      value: "oldest",
      field: "sort",
    }
  ]

  return (
    <>
      <Separator/>
      {comments.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">
          No comments yet.
        </div>
      ) : (
      <>
      <SortSelect
        className="my-2 p-0"
        variant="ghost"
        sort="newest"
        options={sortOptions}
        url={"/comments"}
      />
      comments.map((comment) => (
        <div key={comment.id}>
          <div className="mb-4">
            <CommentCard comment={comment} showIcon={false}/>
            <ReplyCommentForm replyTo={comment.email}/>
          </div>
          <ReplyList />
        </div>
      ))
      </>
    )}
  </>
  );
};

