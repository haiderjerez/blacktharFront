import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8080/api",
})

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Autenticación
export const login = (credentials) => api.post("/auth/login", credentials)
export const register = (userData) => api.post("/users/register", userData)

// Usuarios
export const deleteUser = (userId) => api.delete(`/users/${userId}`)
export const updateUser = (userId, userData) => api.put(`/users/${userId}`, userData)

// Publicaciones
export const getAllPosts = () => api.get("/posts")
export const getUserPosts = (userId) => api.get(`/posts/all/posts/${userId}`)
export const createPost = (postData) => api.post("/posts", postData)
export const deletePost = (postId) => api.delete(`/posts/${postId}`)

// Comentarios
export const getPostComments = (postId) => api.get(`/comments/post/${postId}`)
export const updateComment = (commentId, commentData) => api.put(`/comments/${commentId}`, commentData)
export const deleteComment = (commentId) => api.delete(`/comments/${commentId}`)

// Reacciones
export const addReaction = (reactionData) => api.post("/reactions", reactionData)
export const getReactions = (postId) => api.get(`/reactions/${postId}`)

// Sistema de Seguimiento
export const followUser = (userId) => api.post(`/follow/${userId}`)
export const unfollowUser = (userId) => api.delete(`/follow/${userId}`)
export const getFollowers = (userId) => api.get(`/follow/followers/${userId}`)
export const getFollowing = (userId) => api.get(`/follow/following/${userId}`)

export default api

