import { useState } from "react";
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "../../../services/Comment/comment.service";
import { useGetSellerProfileQuery } from "../../../services/user/user.service";
import { Comment, CommentRequest } from "../../../types/Product/PostProb";
import { UserProfileType } from "../../../types/user";
import { notification } from "antd";

const CommentItem: React.FC<{
  comment: Comment;
  refetch: () => void;
  postId: number;
}> = ({ comment, refetch, postId }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [editedComment, setEditedComment] = useState("");
  const {
    data: profileData,
    isError: profileError,
    isLoading: profileLoading,
  } = useGetSellerProfileQuery(comment.user.userId);

  const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();
  const [updateComment, { isLoading: isUpdating }] = useUpdateCommentMutation();

  if (profileLoading) {
    return <p>Loading profile...</p>;
  }

  if (profileError || !profileData) {
    return <p>Failed to load user profile</p>;
  }

  const profile: UserProfileType = profileData.data;

  const fullName =
    profile.firstName && profile.lastName
      ? `${profile.firstName} ${profile.lastName}`.trim()
      : null;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleDelete = async () => {
    try {
      await deleteComment(comment.comment_id);
      notification.success({
        message: "Xóa thành công",
      });
      refetch();
    } catch (error) {
      notification.error({
        message: "Lỗi: " + error,
      });
    }
  };

  const handleUpdate = async () => {
    try {
      const body: CommentRequest = {
        productId: String(postId),
        userId: String(comment.user.userId),
        message: editedComment,
      };
      console.log(body);

      await updateComment({ id: comment.comment_id, body }).unwrap();
      notification.success({
        message: "Chỉnh sửa thành công",
      });
      refetch();
      setIsUpdateOpen(false);
    } catch (error) {
      notification.error({
        message: "Lỗi: " + error,
      });
    }
  };

  return (
    <div className="flex w-full justify-between border rounded-md">
      <div className="p-3">
        <div className="flex gap-3 items-center">
          <img
            src={profile.profileImageUrl || ""}
            className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400 shadow-emerald-400"
            alt="User Avatar"
          />
          <h3 className="font-bold">
            {fullName || `user${comment.user.username}`}
            <br />
            <span className="text-sm text-gray-400 font-normal">
              @{comment.user.username}
            </span>
          </h3>
        </div>
        {!isUpdateOpen ? (
          <p className="text-gray-600 mt-2">{comment.text}</p>
        ) : (
          <textarea
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
            className="w-full mt-2 border rounded p-2"
          />
        )}

        {isUpdateOpen ? (
          <div className="flex justify-end gap-2 mt-2">
            <button
              className="text-blue-500"
              onClick={handleUpdate}
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save"}
            </button>
            <button
              className="text-red-500"
              onClick={() => setIsUpdateOpen(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button className="text-right text-blue-500 mt-2">Reply</button>
        )}
      </div>

      <div className="flex flex-col items-end gap-3 pr-3 py-3 relative">
        <div>
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v.01M12 12v.01M12 18v.01"
              />
            </svg>
          </button>
          {/* delete với edit đang hơi lỏ đừng test, test là mất luôn user với product á =))))) */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 shadow-lg rounded-md z-10">
              <button
                onClick={() => {
                  setIsUpdateOpen(true);
                  toggleMenu();
                }}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="block px-4 py-2 text-red-600 hover:bg-red-100 w-full text-left"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
