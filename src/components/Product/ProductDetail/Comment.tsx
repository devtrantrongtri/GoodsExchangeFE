import React, { useState } from "react";
import {
  useAddCommentMutation,
  useGetCommentsByPostIdQuery,
} from "../../../services/Comment/comment.service";
import CommentItem from "./CommentItem";
import { Comment, CommentRequest } from "../../../types/Product/PostProb";
import { useGetProfileQuery } from "../../../services/user/user.service";

interface CommentProps {
  postId: number;
}

const Comment: React.FC<CommentProps> = ({ postId }) => {
  const [newComment, setNewComment] = useState("");
  const { data: comments, refetch } = useGetCommentsByPostIdQuery(postId);
  const [addComment, { isLoading: isAddingComment }] = useAddCommentMutation();
  const { data: userProfile, isLoading: isLoadingProfile } =
    useGetProfileQuery();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && userProfile?.data) {
      try {
        const commentRequest: CommentRequest = {
          productId: String(postId),
          userId: String(userProfile.data.user.userId),
          message: newComment.trim(),
        };
        console.log(commentRequest);
        await addComment(commentRequest).unwrap();
        setNewComment("");
        refetch();
      } catch (error) {
        console.error("Failed to add comment:", error);
      }
    }
  };

  if (isLoadingProfile) {
    return <p>Loading user profile...</p>;
  }

  return (
    <div className="w-full bg-white rounded-lg border p-1 md:p-3 m-10">
      <h3 className="font-semibold p-1">Comments on the product</h3>
      <div className="flex flex-col gap-5 m-3">
        {comments?.data ? (
          comments.data.map((comment: Comment) => (
            <CommentItem key={comment.comment_id} comment={comment} />
          ))
        ) : (
          <p>No comments yet.</p>
        )}

        {userProfile?.data ? (
          <form onSubmit={handleSubmit}>
            <div className="w-full px-3 mb-2 mt-6">
              <textarea
                className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
                name="body"
                placeholder="Add a comment"
                required
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
            </div>

            <div className="w-full flex justify-end px-3 my-3">
              <input
                type="submit"
                className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500 cursor-pointer"
                value={isAddingComment ? "Posting..." : "Post Comment"}
                disabled={isAddingComment}
              />
            </div>
          </form>
        ) : (
          <p>Please log in to post a comment.</p>
        )}
      </div>
    </div>
  );
};

export default Comment;
