import PostList from "./components/PostList"
import CreatePost from "./components/CreatePost"

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-black text-white p-4">
        <h1 className="text-2xl font-bold">BlackThar</h1>
      </nav>
      <main className="container mx-auto p-4">
        <CreatePost />
        <PostList />
      </main>
    </div>
  )
}

export default App

