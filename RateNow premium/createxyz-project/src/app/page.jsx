"use client";
import React from "react";
import FooterIconsMenu from "../components/footer-icons-menu";
import HamburgerMenuCreator from "../components/hamburger-menu-creator";

function MainComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { data: session, status } = useSession();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-roboto">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <HamburgerMenuCreator isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">特別会員特典の概要</h2>
          <p className="mb-4">
            Xの特別会員機能にアップグレードすることで、特別な機能やサービスが利用可能になります。広告なしの快適なユーザー体験、限定コンテンツアクセス、カスタマイズ機能などの特典をお楽しみください。
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>広告非表示</li>
            <li>特別テーマやカスタマイズ機能</li>
            <li>限定コンテンツアクセス</li>
            <li>優先サポート</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">会員プラン</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="bg-white rounded-lg shadow-md p-6 flex-1">
              <h3 className="text-lg font-semibold mb-2">月額プラン</h3>
              <p className="text-2xl font-bold mb-4">¥980/月</p>
              <button className="bg-[#FFD700] text-black font-bold py-2 px-4 rounded hover:bg-yellow-400 transition-colors">
                今すぐアップグレード
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex-1">
              <h3 className="text-lg font-semibold mb-2">年額プラン</h3>
              <p className="text-2xl font-bold mb-4">¥9,800/年</p>
              <p className="text-sm text-gray-600 mb-2">（2ヶ月分お得）</p>
              <button className="bg-[#FFD700] text-black font-bold py-2 px-4 rounded hover:bg-yellow-400 transition-colors">
                今すぐアップグレード
              </button>
            </div>
          </div>
        </section>

        <section className="text-center bg-yellow-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">準備中</h2>
          <p>現在特別会員機能は準備中です。リリースまでお待ちください！</p>
        </section>
      </main>

      <FooterIconsMenu currentPath="/premium" />

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;