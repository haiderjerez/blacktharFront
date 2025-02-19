"use client"

import { useState, useEffect } from "react"
import { getAllPosts } from "../services/api"
import Post from "../components/Post"
import CreatePost from "../components/CreatePost"

function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await getAllPosts()
      setPosts(response.data)
      setError("")
    } catch (error) {
      setError("Error al cargar las publicaciones")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handlePostDelete = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId))
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        <p>{error}</p>
        <button onClick={fetchPosts} className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <CreatePost onPostCreated={fetchPosts} />
      {posts.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">No hay publicaciones para mostrar</div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Post key={post.id} post={post} onDelete={handlePostDelete} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home

