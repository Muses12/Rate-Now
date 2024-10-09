"use client";
import React from "react";
import FooterIconsMenu from "../components/footer-icons-menu";
import HamburgerMenuCreator from "../components/hamburger-menu-creator";

function MainComponent() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const header = (
    <header className="fixed w-full bg-white shadow-md p-4">
      <HamburgerMenuCreator isOpen={isOpen} toggleMenu={toggleMenu} />
    </header>
  );

  const bookmarkContent = (
    <div className="pt-16 pb-24 px-4 md:px-6 lg:px-8 max-w-3xl mx-auto">
      <div className="p-6 bg-gray-100 rounded-lg text-center">
        <p className="text-gray-700 text-xl">
          ブックマーク機能は現在準備中です
        </p>
        <p className="text-gray-500 mt-3">
          現在、ブックマークされた投稿はありません。後で保存したい投稿があれば、ここに表示されます。
        </p>
      </div>
      <div className="mt-6 bg-white rounded-md shadow-md p-4 hidden">
        <p>
          仮のブックマーク表示デザイン（ユーザーネーム、投稿内容、ブックマーク解除ボタンなど）
        </p>
      </div>
    </div>
  );

  const footer = <FooterIconsMenu currentPath="/bookmark" />;

  return (
    <div className="h-screen flex flex-col justify-between">
      {header}
      {bookmarkContent}
      {footer}
      <style jsx global>{`
        .hamburger-menu-active {
          color: #000;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;