// pages/edit/[id].js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../../utils/api";
import Navbar from "../../components/Navbar";
import Link from "next/link";

export default function EditPost() {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [currentImg, setCurrentImg] = useState("");

  useEffect(() => {
    if (!id) return;
    api
      .get(`/posts/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
        setCurrentImg(res.data.imageUrl || "");
      })
      .catch(console.error);
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("content", content);
    if (image) form.append("image", image);

    try {
      const res = await api.put(`/posts/${id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      router.push(`/post/${res.data._id}`);
    } catch (err) {
      alert(err.response?.data?.error || "Update failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-pink-500 mb-6 text-center">
          ✏️ Edit Post
        </h1>

        {currentImg && (
          <div className="mb-6 flex justify-center">
            <img
              src={currentImg}
              alt="Current"
              className="max-w-xs rounded-lg shadow-md border border-pink-100"
            />
          </div>
        )}

        <form
          onSubmit={submit}
          className="bg-white shadow-lg rounded-xl p-6 space-y-5 border border-pink-100"
        >
          <input
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

          <div className="flex justify-center gap-4">
            <button
              type="submit"
              className="bg-pink-400 hover:bg-pink-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-200"
            >
              Update Post
            </button>
            <Link href={`/post/${id}`}>
              <button
                type="button"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-200"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
