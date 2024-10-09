"use client";
import React from "react";
import FooterIconsMenu from "../components/footer-icons-menu";
import HamburgerMenuCreator from "../components/hamburger-menu-creator";

function MainComponent() {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const [activeSection, setActiveSection] = React.useState(null);

  const helpSections = [
    {
      title: "よくある質問 (FAQ)",
      content: [
        {
          q: "アカウントの作成方法は？",
          a: "「サインアップ」ボタンをクリックし、必要な情報を入力してアカウントを作成できます。",
        },
        {
          q: "投稿の方法は？",
          a: "フッターの「+」アイコンをタップし、テキストや画像を入力して投稿できます。",
        },
        {
          q: "通知設定の変更方法は？",
          a: "設定 > 通知から、受け取りたい通知の種類を選択できます。",
        },
      ],
    },
    {
      title: "アプリの使い方",
      content: [
        {
          q: "投稿の仕方",
          a: "1. フッターの「+」アイコンをタップ\n2. テキストを入力\n3. 必要に応じて画像を追加\n4. 「投稿」ボタンをタップ",
        },
        {
          q: "検索機能の使用方法",
          a: "1. フッターの虫眼鏡アイコンをタップ\n2. キーワードを入力\n3. エンターキーを押すか検索アイコンをタップ",
        },
      ],
    },
    {
      title: "トラブルシューティング",
      content: [
        {
          q: "ログインできない場合",
          a: "1. ユーザー名とパスワードを確認\n2. インターネット接続を確認\n3. アプリを再起動\n4. それでも解決しない場合はサポートに連絡",
        },
        {
          q: "投稿が表示されない",
          a: "1. アプリを再起動\n2. インターネット接続を確認\n3. 設定でコンテンツフィルターを確認\n4. 問題が続く場合はサポートに連絡",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <HamburgerMenuCreator isOpen={isOpen} toggleMenu={toggleMenu} />
      </header>

      <main className="flex-grow p-4 overflow-y-auto font-roboto">
        {helpSections.map((section, index) => (
          <div key={index} className="mb-6">
            <h2
              className="text-lg font-semibold mb-2 bg-white p-3 rounded-lg shadow cursor-pointer"
              onClick={() =>
                setActiveSection(activeSection === index ? null : index)
              }
            >
              {section.title}
              <i
                className={`fas fa-chevron-${
                  activeSection === index ? "up" : "down"
                } float-right`}
              ></i>
            </h2>
            {activeSection === index && (
              <div className="bg-white p-4 rounded-lg shadow">
                {section.content.map((item, itemIndex) => (
                  <div key={itemIndex} className="mb-4">
                    <h3 className="font-medium mb-2">{item.q}</h3>
                    <p className="text-gray-600 whitespace-pre-line">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">お問い合わせ</h2>
          <a
            href="/contact"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg inline-block hover:bg-blue-600 transition duration-300"
          >
            サポートに連絡する
          </a>
        </div>
      </main>

      <FooterIconsMenu currentPath="/" />
    </div>
  );
}

export default MainComponent;