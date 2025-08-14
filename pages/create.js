// pages/create.js
import { useState } from "react";
import { useRouter } from "next/router";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function CreatePost() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const form = new FormData();
      form.append("title", title);
      form.append("content", content);
      if (image) form.append("image", image);

      const res = await api.post("/posts", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      router.push(`/post/${res.data._id}`);
    } catch (error) {
      setErr(error.response?.data?.error || "Create failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-pink-500 mb-6 text-center">
          ✏️ Create a New Post
        </h1>

        <form
          onSubmit={submit}
          className="bg-white shadow-lg rounded-xl p-6 space-y-5 border border-pink-100"
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post Title"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your content here..."
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg min-h-[150px] resize-none focus:ring-2 focus:ring-pink-300 outline-none"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:text-sm file:font-semibold
                       file:bg-pink-100 file:text-pink-600
                       hover:file:bg-pink-200"
          />

          {err && <p className="text-red-500 text-sm">{err}</p>}

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-pink-400 hover:bg-pink-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-200"
            >
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
