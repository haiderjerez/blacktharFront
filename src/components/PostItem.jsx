function PostItem({ post }) {
  return (
    <div className="bg-white dark:bg-primary-900 rounded-lg shadow-md p-4">
      <div className="flex items-start">
        <img
          src={post.author.profilePicture || "/placeholder.svg"}
          alt={post.author.username}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h3 className="font-semibold text-primary-950 dark:text-white">{post.author.username}</h3>
          <p className="text-sm text-primary-600 dark:text-primary-400">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <p className="mt-2 text-primary-800 dark:text-primary-200">{post.content}</p>
      {post.imageUrl && (
        <img
          src={post.imageUrl || "/placeholder.svg"}
          alt="Post content"
          className="mt-2 rounded-lg max-w-full h-auto"
        />
      )}
    </div>
  )
}

export default PostItem

