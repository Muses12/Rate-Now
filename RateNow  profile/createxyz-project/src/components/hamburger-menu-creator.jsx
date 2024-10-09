"use client";
import React from "react";

function HamburgerMenuCreator({ isOpen, toggleMenu }) {
  return (
    <div className="relative">
      <button
        className="text-xl p-2 hover:bg-gray-200"
        onClick={toggleMenu}
        style={{ display: "inline-block" }}
      >
        <i className="fas fa-bars"></i>
      </button>
      {isOpen && (
        <div className="absolute top-0 left-0 bg-white shadow-lg p-4 w-[200px]">
          <button
            className="absolute top-0 right-0 text-xl p-2 hover:bg-gray-200"
            onClick={toggleMenu}
            style={{ display: "inline-block" }}
          >
            <i className="fas fa-times"></i>
          </button>
          <ul className="mt-4">
            <li className="p-2 hover:bg-gray-200">
              <a href="/profile" className="flex items-center">
                <i className="fas fa-user mr-2"></i>
                <span>プロフィール</span>
              </a>
            </li>
            <li className="p-2 hover:bg-gray-200">
              <a href="/settings" className="flex items-center">
                <i className="fas fa-cog mr-2"></i>
                <span>設定</span>
              </a>
            </li>
            <li className="p-2 hover:bg-gray-200">
              <a href="/help" className="flex items-center">
                <i className="fas fa-question-circle mr-2"></i>
                <span>ヘルプ</span>
              </a>
            </li>
            <li className="p-2 hover:bg-gray-200">
              <a href="/premium" className="flex items-center">
                <i className="fas fa-star mr-2"></i>
                <span>プレミアム</span>
              </a>
            </li>
            <li className="p-2 hover:bg-gray-200">
              <a href="/bookmark" className="flex items-center">
                <i className="fas fa-bookmark mr-2"></i>
                <span>ブックマーク</span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

function HamburgerMenuCreatorStory() {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="p-4">
      <HamburgerMenuCreator isOpen={isOpen} toggleMenu={toggleMenu} />
    </div>
  );
}

export default HamburgerMenuCreator;