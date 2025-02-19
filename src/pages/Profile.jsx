"use client"

import { useState, useEffect } from "react"
import { getProfile, updateProfile } from "../services/api"

function Profile() {
  const [profile, setProfile] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile()
        setProfile(response.data)
      } catch (error) {
        console.error("Error fetching profile:", error)
      }
    }

    fetchProfile()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateProfile(profile)
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  if (!profile) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-primary-950">Profile</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={profile.fullName}
              onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="bio" className="block mb-1">
              Bio
            </label>
            <textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="profilePicture" className="block mb-1">
              Profile Picture URL
            </label>
            <input
              type="url"
              id="profilePicture"
              value={profile.profilePicture}
              onChange={(e) => setProfile({ ...profile, profilePicture: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary-950 text-white py-2 rounded hover:bg-primary-800 transition duration-300"
          >
            Save Changes
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div>
            <strong>Full Name:</strong> {profile.fullName}
          </div>
          <div>
            <strong>Bio:</strong> {profile.bio}
          </div>
          <div>
            <strong>Profile Picture:</strong>
            <img
              src={profile.profilePicture || "/placeholder.svg"}
              alt="Profile"
              className="mt-2 w-32 h-32 rounded-full"
            />
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="w-full bg-primary-950 text-white py-2 rounded hover:bg-primary-800 transition duration-300"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  )
}

export default Profile

