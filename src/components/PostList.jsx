"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import Post from "./Post"

function PostList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await axios.get("http://localhost:8080/api/posts")
      setPosts(response.data)
      setError("")
    } catch (err) {
      setError("Error al cargar las publicaciones")
    } finally {
      setLoading(false)
    }
  }

  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/posts/${id}`)
      setPosts(posts.filter((post) => post.id !== id))
    } catch (err) {
      setError("Error al eliminar la publicación")
    }
  }

  if (loading) return <div className="text-center mt-4">Cargando...</div>
  if (error) return <div className="text-center mt-4 text-red-500">{error}</div>

  return (
    <div className="mt-8 space-y-4">
      {posts.map((post) => (
        <Post key={post.id} post={post} onDelete={deletePost} onUpdate={fetchPosts} />
      ))}
    </div>
  )
}

export default PostList

