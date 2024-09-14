import { useState } from "react";
import { useDeleteCommentMutation } from "../../../services/Comment/comment.service";
import { useGetSellerProfileQuery } from "../../../services/user/user.service";
import { Comment } from "../../../types/Product/PostProb";
import { UserProfileType } from "../../../types/user";

const CommentItem: React.FC<{ comment: Comment }> = ({ comment }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    data: profileData,
    isError: profileError,
    isLoading: profileLoading,
  } = useGetSellerProfileQuery(comment.user.userId);

  const [deleteComment] = useDeleteCommentMutation();

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
    } catch (error) {
      console.error("Failed to delete comment", error);
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
        <p className="text-gray-600 mt-2">{comment.text}</p>
        <button className="text-right text-blue-500">Reply</button>
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
                onClick={() => console.log("Edit Comment")}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="block px-4 py-2 text-red-600 hover:bg-red-100 w-full text-left"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
