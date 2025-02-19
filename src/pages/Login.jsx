"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { login } from "../services/api"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const { login: authLogin } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await login({ email, password })
      authLogin(response.data.user)
      localStorage.setItem("token", response.data.token)
      navigate("/")
    } catch (error) {
      console.error("Login error:", error)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-primary-950">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1 text-primary-800">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-secondary-400"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 text-primary-800">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-secondary-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary-950 text-white py-2 rounded hover:bg-primary-800 transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login

