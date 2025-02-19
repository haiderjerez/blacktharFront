"use client"

import { useState, useEffect } from "react"
import { getPostComments, addReaction, deletePost, deleteComment } from "../services/api"
import { Heart, MessageCircle, Trash } from "lucide-react"

function Post({ post, onDelete }) {
  const [comments, setComments] = useState([])
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    if (showComments) {
      loadComments()
    }
  }, [showComments]) // Removed unnecessary dependency: post.id

  const loadComments = async () => {
    try {
      const response = await getPostComments(post.id)
      setComments(response.data)
    } catch (error) {
      console.error("Error loading comments:", error)
    }
  }

  const handleLike = async () => {
    try {
      await addReaction({ postId: post.id })
      setIsLiked(!isLiked)
    } catch (error) {
      console.error("Error adding reaction:", error)
    }
  }

  const handleDelete = async () => {
    try {
      await deletePost(post.id)
      onDelete(post.id)
    } catch (error) {
      console.error("Error deleting post:", error)
    }
  }

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId)
      loadComments()
    } catch (error) {
      console.error("Error deleting comment:", error)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <img
            src={post.author?.profilePicture || "/placeholder.svg"}
            alt={post.author?.username}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{post.author?.username}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <button onClick={handleDelete} className="text-red-500 hover:text-red-700" aria-label="Delete post">
          <Trash className="w-5 h-5" />
        </button>
      </div>

      <p className="text-gray-800 dark:text-gray-200 mb-4">{post.content}</p>

      <div className="flex items-center space-x-4">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-1 ${isLiked ? "text-purple-600" : "text-gray-500 dark:text-gray-400"}`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
          <span>{post.reactionCount || 0}</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-1 text-gray-500 dark:text-gray-400"
        >
          <MessageCircle className="w-5 h-5" />
          <span>{comments.length}</span>
        </button>
      </div>

      {showComments && (
        <div className="mt-4 space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="flex justify-between items-start bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
            >
              <div>
                <div className="flex items-center">
                  <img
                    src={comment.author?.profilePicture || "/placeholder.svg"}
                    alt={comment.author?.username}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <span className="font-semibold text-gray-900 dark:text-white">{comment.author?.username}</span>
                </div>
                <p className="mt-1 text-gray-800 dark:text-gray-200">{comment.content}</p>
              </div>
              <button onClick={() => handleDeleteComment(comment.id)} className="text-red-500 hover:text-red-700">
                <Trash className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Post

