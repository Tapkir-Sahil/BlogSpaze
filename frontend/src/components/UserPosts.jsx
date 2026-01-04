import { useEffect, useState } from "react";
import API from "../api/axios";
import PostCard from "./PostCard";

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await API.get("/api/blogs/my-posts");
        setPosts(res.data);
      } catch (err) {
        setError("Failed to load your posts");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

  if (loading) {
    return <p className="text-center text-muted">Loading your posts...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0">Your Posts</h5>
        <div className="d-flex align-items-center text-muted">
          <i className="bi bi-filter me-1"></i> Filter
        </div>
      </div>

      {/* Empty State */}
      {posts.length === 0 && (
        <p className="text-muted text-center">
          You haven’t written any blogs yet ✍️
        </p>
      )}

      {/* Posts */}
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={{
            id: post._id,
            title: post.title,
            description: post.description,
            image: post.image || "/blogspaze_logo.png",
            views: post.views || 0,
            likes: post.likes?.length || 0,
            comments: post.comments?.length || 0,
          }}
        />
      ))}
    </div>
  );
};

export default UserPosts;
