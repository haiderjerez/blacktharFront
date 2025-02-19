"use client"

import { useState } from "react"

function CreatePostForm({ onCreatePost }) {
  const [content, setContent] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!content.trim()) return

    onCreatePost({ content, imageUrl: imageUrl || null })
    setContent("")
    setImageUrl("")
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-primary-900 rounded-lg shadow-md p-4 mb-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary-400 dark:bg-primary-800 dark:border-primary-700 dark:text-white"
        rows="3"
        required
      />
      <input
        type="url"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL (optional)"
        className="w-full mt-2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary-400 dark:bg-primary-800 dark:border-primary-700 dark:text-white"
      />
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-primary-950 text-white rounded-lg hover:bg-primary-800 transition-colors duration-200"
      >
        Post
      </button>
    </form>
  )
}

export default CreatePostForm

