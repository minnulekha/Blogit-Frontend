// pages/post/[id].js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../../utils/api";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!id) return;
    api
      .get(`/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch(console.error);
  }, [id]);

  const isOwner =
    post &&
    user &&
    String(post.author?._id || post.author) === String(user.id || user._id);

  const deletePost = async () => {
    if (!confirm("Delete this post?")) return;
    try {
      await api.delete(`/posts/${id}`);
      router.push("/");
    } catch (err) {
      alert(err.response?.data?.error || "Delete failed");
    }
  };

  if (!post)
    return (
      <>
        <Navbar />
        <div className="max-w-3xl mx-auto py-10 px-4 text-center text-gray-500">
          Loading...
        </div>
      </>
    );

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto py-10 px-4">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-pink-100">
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full max-h-[450px] object-cover"
            />
          )}

          <div className="p-6 space-y-4">
            <h1 className="text-3xl font-bold text-pink-500">{post.title}</h1>
            <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
            <p className="text-sm text-gray-500">
              by <span className="font-medium">{post.author?.username}</span>
            </p>

            {isOwner && (
              <div className="flex gap-4">
                <Link href={`/edit/${id}`}>
                  <button className="bg-pink-400 hover:bg-pink-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={deletePost}
                  className="bg-red-400 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200"
                >
                  Delete
                </button>
              </div>
            )}

            <Link href="/">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200">
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
