import React, { useState } from "react";

interface Post {
  id: number;
  user: string;
  content: string;
  media?: string;
  mediaType?: "image" | "video";
  likes: number;
  comments: string[];
}

const SocialWall: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState<string>("");
  const [newMedia, setNewMedia] = useState<string | null>(null);
  const [newMediaType, setNewMediaType] = useState<"image" | "video" | null>(null);
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({});

  // Handle media file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.type.startsWith("image") ? "image" : file.type.startsWith("video") ? "video" : null;
      if (fileType) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setNewMedia(e.target?.result as string);
          setNewMediaType(fileType);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // Handle new post submission
  const handlePostSubmit = () => {
    if (!newPost.trim() && !newMedia) return;
    const newPostData: Post = {
      id: posts.length + 1,
      user: "You", // Placeholder user
      content: newPost,
      media: newMedia || undefined,
      mediaType: newMediaType || undefined,
      likes: 0,
      comments: [],
    };
    setPosts([newPostData, ...posts]);
    setNewPost("");
    setNewMedia(null);
    setNewMediaType(null);
  };

  // Handle like button
  const handleLike = (id: number) => {
    setPosts(posts.map(post => post.id === id ? { ...post, likes: post.likes + 1 } : post));
  };

  // Handle new comment submission
  const handleCommentSubmit = (id: number) => {
    if (!newComment[id]?.trim()) return;
    setPosts(posts.map(post =>
      post.id === id ? { ...post, comments: [...post.comments, newComment[id]] } : post
    ));
    setNewComment({ ...newComment, [id]: "" });
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📢 Event Social Wall</h2>

      {/* New Post Input */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow">
        <textarea
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Share something about the event..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <input
          type="file"
          accept="image/*,video/*"
          className="mt-2 w-full"
          onChange={handleFileUpload}
        />
        {newMedia && (
          <div className="mt-2">
            {newMediaType === "image" ? (
              <img src={newMedia} alt="Preview" className="rounded-lg max-h-48" />
            ) : (
              <video controls className="rounded-lg max-h-48">
                <source src={newMedia} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}
        <button
          onClick={handlePostSubmit}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Post
        </button>
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet. Be the first to share an update!</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="p-4 bg-white rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">{post.user}</h3>
              <p className="text-gray-700">{post.content}</p>

              {post.media && (
                <div className="mt-2">
                  {post.mediaType === "image" ? (
                    <img src={post.media} alt="Post" className="rounded-lg w-full" />
                  ) : (
                    <video className="w-full rounded-lg" controls>
                      <source src={post.media} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              )}

              {/* Like & Comment Section */}
              <div className="mt-3 flex items-center space-x-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  👍 {post.likes}
                </button>
              </div>

              {/* Comments */}
              <div className="mt-3">
                {post.comments.map((comment, index) => (
                  <p key={index} className="text-gray-600">💬 {comment}</p>
                ))}
                <div className="mt-2 flex space-x-2">
                  <input
                    type="text"
                    className="flex-grow p-2 border rounded-lg focus:outline-none"
                    placeholder="Write a comment..."
                    value={newComment[post.id] || ""}
                    onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })}
                  />
                  <button
                    onClick={() => handleCommentSubmit(post.id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SocialWall;
