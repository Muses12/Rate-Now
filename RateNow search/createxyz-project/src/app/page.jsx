"use client";
import React from "react";
import HamburgerMenuCreator from "../components/hamburger-menu-creator";
import FooterIconsMenu from "../components/footer-icons-menu";

function MainComponent() {
  const { data: session, status } = useSession();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [hamburgerOpen, setHamburgerOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const toggleHamburgerMenu = () => setHamburgerOpen(!hamburgerOpen);

  const handleSearch = async () => {
    setLoading(true);
    const response = await fetch("/api/db/footer-navigation-icons-users", {
      method: "POST",
      body: JSON.stringify({
        query:
          "SELECT `user_id`, `name`, `content`, `image`, `hushtug`, `ratings` FROM `new_post` WHERE `hushtug` LIKE ?",
        values: ["%" + searchTerm + "%"],
      }),
    });
    const posts = await response.json();

    const userIds = posts.map((post) => post.user_id);
    const uniqueUserIds = [...new Set(userIds)];

    const usersResponse = await fetch("/api/db/footer-navigation-icons-users", {
      method: "POST",
      body: JSON.stringify({
        query:
          "SELECT `id`, `name`, `image` FROM `user_accounts` WHERE `id` IN (?)",
        values: [uniqueUserIds],
      }),
    });
    const users = await usersResponse.json();
    const userMap = Object.fromEntries(users.map((user) => [user.id, user]));

    const results = posts.map((post) => ({
      ...post,
      userImage: userMap[post.user_id]?.image,
      userName: post.name || "ゲスト",
    }));

    setSearchResults(results);
    setLoading(false);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <i
        key={index}
        className={`fas fa-star ${
          index < rating ? "text-yellow-500" : "text-gray-300"
        }`}
      ></i>
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full flex items-center p-4 bg-white shadow-md">
        <HamburgerMenuCreator
          isOpen={hamburgerOpen}
          toggleMenu={toggleHamburgerMenu}
        />
      </header>

      <div className="flex-grow flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-lg flex border-b-2 border-gray-300 focus-within:border-blue-500">
          <input
            type="text"
            className="flex-grow p-3 outline-none"
            name="search"
            placeholder="検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="p-2" onClick={handleSearch}>
            <i className="fas fa-search text-gray-400"></i>
          </button>
        </div>

        <div className="mt-8 w-full max-w-lg">
          {loading ? (
            <p className="text-center text-gray-500">読み込み中...</p>
          ) : searchResults.length === 0 ? (
            <p className="text-center text-gray-500">
              該当する投稿がありません
            </p>
          ) : (
            searchResults.map((post, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 mb-4"
              >
                <div className="flex items-center mb-2">
                  <img
                    src={post.userImage}
                    alt="アイコン"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <span className="font-bold">{post.userName}</span>
                </div>
                <p className="mb-2">{post.content}</p>
                {post.image && (
                  <img
                    src={post.image}
                    alt="投稿画像"
                    className="w-full h-auto mb-2"
                  />
                )}
                <p className="text-blue-500 mb-2">{post.hushtug}</p>
                <div className="flex">{renderStars(post.ratings)}</div>
              </div>
            ))
          )}
        </div>
      </div>

      <FooterIconsMenu currentPath="/search" />

      <style jsx global>{`
        div {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;