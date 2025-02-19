"use client"

import { useState } from "react"
import { createPost } from "../services/api"

function CreatePost({ onPostCreated }) {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim()) return

    setIsSubmitting(true)
    setError("")

    try {
      await createPost({ content: content.trim() })
      setContent("")
      if (onPostCreated) onPostCreated()
    } catch (error) {
      setError("Error al crear la publicación")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="¿Qué estás pensando?"
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        rows="3"
        maxLength={500}
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">{content.length}/500</span>
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Publicando..." : "Publicar"}
        </button>
      </div>
    </form>
  )
}

export default CreatePost

