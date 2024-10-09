"use client";
import React from "react";
import HamburgerMenuCreator from "../components/hamburger-menu-creator";
import FooterIconsMenu from "../components/footer-icons-menu";

function MainComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [profileImage, setProfileImage] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [posts, setPosts] = React.useState([]);
  const [isEditing, setIsEditing] = React.useState(false);
  const [newUsername, setNewUsername] = React.useState("");
  const [postIdToDelete, setPostIdToDelete] = React.useState(null);
  const { data: session, status } = useSession();

  React.useEffect(() => {
    if (status === "authenticated") {
      fetchUserData();
      fetchUserPosts();
    }
  }, [status]);

  const fetchUserData = async () => {
    const response = await fetch("/api/db/footer-navigation-icons-users", {
      method: "POST",
      body: JSON.stringify({
        query: "SELECT `name`, `image` FROM `user_accounts` WHERE `id` = ?",
        values: [session.user.id],
      }),
    });
    const data = await response.json();
    if (data.length > 0) {
      setUsername(data[0].name);
      setProfileImage(data[0].image);
    }
  };

  const fetchUserPosts = async () => {
    const response = await fetch("/api/db/footer-navigation-icons-users", {
      method: "POST",
      body: JSON.stringify({
        query:
          "SELECT * FROM `new_post` WHERE `user_id` = ? ORDER BY `id` DESC",
        values: [session.user.id],
      }),
    });
    const data = await response.json();
    setPosts(data);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = async () => {
      setProfileImage(reader.result);
      await fetch("/api/db/footer-navigation-icons-users", {
        method: "POST",
        body: JSON.stringify({
          query: "UPDATE `user_accounts` SET `image` = ? WHERE `id` = ?",
          values: [reader.result, session.user.id],
        }),
      });
    };
    reader.readAsDataURL(file);
  };

  const handleUsernameChange = async () => {
    await fetch("/api/db/footer-navigation-icons-users", {
      method: "POST",
      body: JSON.stringify({
        query: "UPDATE `user_accounts` SET `name` = ? WHERE `id` = ?",
        values: [newUsername, session.user.id],
      }),
    });
    setUsername(newUsername);
    setIsEditing(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const confirmDeletePost = (postId) => {
    setPostIdToDelete(postId);
  };

  const handleDeletePost = async () => {
    if (postIdToDelete) {
      await fetch("/api/db/footer-navigation-icons-users", {
        method: "POST",
        body: JSON.stringify({
          query: "DELETE FROM `new_post` WHERE `id` = ? AND `user_id` = ?",
          values: [postIdToDelete, session.user.id],
        }),
      });
      setPosts(posts.filter((post) => post.id !== postIdToDelete));
      setPostIdToDelete(null);
    }
  };

  if (status === "loading") {
    return <div className="text-center mt-8">読み込み中...</div>;
  }

  if (status === "unauthenticated") {
    return (
      <div className="text-center mt-8">
        プロフィールを見るにはサインインしてください。
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-sm p-4">
        <HamburgerMenuCreator isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4">
              <img
                src={profileImage || "/default-avatar.png"}
                alt="プロフィール画像"
                className="w-32 h-32 rounded-full object-cover"
              />
              <label
                htmlFor="profile-image"
                className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer"
              >
                <i className="fas fa-camera"></i>
              </label>
              <input
                id="profile-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            {isEditing ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="border rounded px-2 py-1 mr-2"
                />
                <button
                  onClick={handleUsernameChange}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  保存
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <h2 className="text-2xl font-bold mr-2">{username}</h2>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-500"
                >
                  <i className="fas fa-edit"></i>
                </button>
              </div>
            )}
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">あなたの投稿</h3>
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-gray-50 rounded-lg p-4 mb-4 relative"
              >
                <button
                  onClick={() => confirmDeletePost(post.id)}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                >
                  <i className="fas fa-trash"></i>
                </button>
                <p className="mb-2">{post.content}</p>
                {post.image && (
                  <img
                    src={post.image}
                    alt="投稿画像"
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                )}
                {post.hushtug && (
                  <p className="text-blue-500">#{post.hushtug}</p>
                )}
                <div className="flex items-center mt-2">
                  <span className="mr-2">評価:</span>
                  {[...Array.from({ length: 5 })].map((_, index) => (
                    <i
                      key={index}
                      className={`fas fa-star ${
                        index < post.ratings
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    ></i>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {postIdToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md w-[300px]">
            <p className="mb-4">本当に削除しますか？</p>
            <div className="flex justify-end">
              <button
                onClick={() => setPostIdToDelete(null)}
                className="px-4 py-2 mr-2 bg-gray-300 rounded"
              >
                キャンセル
              </button>
              <button
                onClick={handleDeletePost}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                削除
              </button>
            </div>
          </div>
        </div>
      )}

      <FooterIconsMenu currentPath="/profile" />
    </div>
  );
}

export default MainComponent;