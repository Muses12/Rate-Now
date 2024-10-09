"use client";
import React from "react";
import HamburgerMenuCreator from "../components/hamburger-menu-creator";
import FooterIconsMenu from "../components/footer-icons-menu";

function MainComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [posts, setPosts] = React.useState([]);
  const { data: session, status } = useSession();

  React.useEffect(() => {
    fetchRandomPosts();
  }, []);

  const fetchRandomPosts = async () => {
    try {
      const response = await fetch("/api/db/footer-navigation-icons-users", {
        method: "POST",
        body: JSON.stringify({
          query: `
            SELECT np.*, ua.image as user_image
            FROM new_post np
            LEFT JOIN user_accounts ua ON np.user_id = ua.id
            ORDER BY RANDOM()
            LIMIT 10
          `,
        }),
      });
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <header className="bg-white shadow-md p-4">
        <HamburgerMenuCreator isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </header>

      <main className="flex-grow p-4 overflow-y-auto">
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white shadow-md rounded-lg p-4">
              <div className="flex items-center mb-2">
                {post.user_image ? (
                  <img
                    src={post.user_image}
                    alt="User avatar"
                    className="w-10 h-10 rounded-full mr-2"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-400 mr-2"></div>
                )}
                <h2 className="font-semibold">{post.name || "ゲスト"}</h2>
              </div>
              <p className="mb-2">{post.content}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post image"
                  className="w-full h-auto rounded-lg mb-2"
                />
              )}
              {post.hushtug && (
                <p className="text-blue-500 mb-2">#{post.hushtug}</p>
              )}
              <div className="flex items-center">
                <i className="fas fa-star text-yellow-400 mr-1"></i>
                <span>{post.ratings || 0}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <FooterIconsMenu currentPath="/home" />
    </div>
  );
}

export default MainComponent;