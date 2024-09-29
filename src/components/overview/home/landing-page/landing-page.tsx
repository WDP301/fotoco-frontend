import CommentSection from './comment-section';
import { JoinNow } from './join-now';
import { PhotoSection } from './photo-section';

export default function LandingPage() {
  return (
    <>
      <JoinNow />
      <PhotoSection />
      <CommentSection />
    </>
  );
}
