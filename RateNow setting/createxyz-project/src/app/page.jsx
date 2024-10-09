"use client";
import React from "react";
import FooterIconsMenu from "../components/footer-icons-menu";
import HamburgerMenuCreator from "../components/hamburger-menu-creator";

function MainComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false);
  const { data: session, status } = useSession();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    fetch("/api/auth/signout", { method: "POST" }).then(
      () => (window.location.href = "/account/signin")
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="w-full flex items-center p-4 bg-white shadow-md">
        <HamburgerMenuCreator isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <button
          onClick={handleLogout}
          className="bg-[#FF4B4B] text-white font-bold py-2 px-4 rounded-full hover:bg-[#FF3333] transition duration-300"
        >
          ログアウト
        </button>

        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <p className="mb-4">本当にログアウトしますか？</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  キャンセル
                </button>
                <button
                  onClick={confirmLogout}
                  className="px-4 py-2 bg-[#FF4B4B] text-white rounded-md hover:bg-[#FF3333]"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <FooterIconsMenu currentPath="/settings" />
    </div>
  );
}

export default MainComponent;