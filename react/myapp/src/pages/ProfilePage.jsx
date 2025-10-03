import ProfileHeader from "../components/ProfileHeader";
import UserPosts from "../components/UserPosts";

const ProfilePage = () => {
  return (
    <div className="container mt-4">
      <ProfileHeader />
      <hr className="my-4" />
      <UserPosts />
    </div>
  );
};

export default ProfilePage;
