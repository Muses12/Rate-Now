"use client";
import React from "react";

function FooterIconsMenu({ currentPath }) {
  const iconClasses =
    "fa-lg transition-colors hover:text-gray-500 text-gray-400";
  const activeIconClasses = "text-black";

  const homeIconClass =
    currentPath !== "/search" &&
    currentPath !== "/post" &&
    currentPath !== "/profile"
      ? activeIconClasses
      : iconClasses;
  const searchIconClass =
    currentPath === "/search" ? activeIconClasses : iconClasses;
  const postIconClass =
    currentPath === "/post" ? activeIconClasses : iconClasses;
  const profileIconClass =
    currentPath === "/profile" ? activeIconClasses : iconClasses;

  return (
    <footer className="flex justify-around items-center w-full bg-[#f8f9fa] p-2 text-xs fixed bottom-0">
      <a href="/" className="text-center p-1">
        <i className={`fas fa-home ${homeIconClass}`} aria-label="ホーム"></i>
      </a>
      <a href="/search" className="text-center p-1">
        <i className={`fas fa-search ${searchIconClass}`} aria-label="検索"></i>
      </a>
      <a href="/post" className="text-center p-1">
        <i
          className={`fas fa-plus-circle ${postIconClass}`}
          aria-label="投稿"
        ></i>
      </a>
      <a href="/profile" className="text-center p-1">
        <i
          className={`fas fa-user ${profileIconClass}`}
          aria-label="プロフィール"
        ></i>
      </a>
    </footer>
  );
}

function FooterIconsMenuStory() {
  return (
    <div className="h-screen flex flex-col justify-end">
      <FooterIconsMenu currentPath="/" />
      <FooterIconsMenu currentPath="/search" />
      <FooterIconsMenu currentPath="/post" />
      <FooterIconsMenu currentPath="/profile" />
      <FooterIconsMenu currentPath="/ratenow" />
      <FooterIconsMenu currentPath="/somethingelse" />
    </div>
  );
}

export default FooterIconsMenu;