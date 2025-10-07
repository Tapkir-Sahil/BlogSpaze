import PostCard from "./PostCard";

const UserPosts = () => {
  const posts = [
    {
      id: 1,
      title: "Which Is The Best Programming Language",
      description:
        "There are multiple programming languages in the market. Which one is better, how to choose?",
      image: "/post-thumbnail.jpg",
      views: "1.8k",
      likes: 523,
      comments: 56,
    },
    {
      id: 2,
      title: "Which Is The Best Programming Language",
      description:
        "There are multiple programming languages in the market. Which one is better, how to choose?",
      image: "/post-thumbnail.jpg",
      views: "1.8k",
      likes: 523,
      comments: 56,
    },
  ];

  return (
    <div>
      {/* Header Row */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0">Post</h5>
        <div className="d-flex align-items-center text-muted">
          <i className="bi bi-filter me-1"></i> Filter
        </div>
      </div>

      {/* Post List */}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default UserPosts;
