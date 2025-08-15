import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  console.log("API URL at runtime:", process.env.NEXT_PUBLIC_API_URL);
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    api.get("/posts").then((res) => setPosts(res.data)).catch(console.error);
  }, []);

  const isOwner = (post) => {
    const authorId = post.author?._id || post.author;
    const userId = user?.id || user?._id;
    return !!userId && String(authorId) === String(userId);
  };

  return (
    <>
    
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6 text-center text-pink-500">Blog Posts</h1>

        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post._id} className="bg-white p-6 rounded-lg shadow">
                {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="w-full rounded mb-4" />}
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-gray-700">{post.content.slice(0, 120)}{post.content.length>120?'...':''}</p>
                <p className="text-xs text-gray-500 mt-2">by {post.author?.username || "Unknown"}</p>
                <div className="mt-4 flex gap-2">
                  <Link href={`/post/${post._id}`}><button>Read More</button></Link>
                  {isOwner(post) && <Link href={`/edit/${post._id}`}><button>Edit</button></Link>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
