"use client";
import React from "react";
import HamburgerMenuCreator from "../components/hamburger-menu-creator";
import FooterIconsMenu from "../components/footer-icons-menu";

function MainComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [content, setContent] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [convertedImage, setConvertedImage] = React.useState("");
  const [hashtag, setHashtag] = React.useState("");
  const [rating, setRating] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { data: session, status } = useSession();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const fetchUserName = async (userId) => {
    try {
      const response = await fetch("/api/db/footer-navigation-icons-users", {
        method: "POST",
        body: JSON.stringify({
          query: `SELECT name FROM user_accounts WHERE id = ?`,
          values: [userId],
        }),
      });

      const data = await response.json();
      return data.length > 0 ? data[0].name : "ゲスト";
    } catch (error) {
      console.error("Error fetching user name:", error);
      return "ゲスト";
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setImage(file);

      const formData = new FormData();
      formData.append("inputFile", file);
      formData.append("outputType", "png");

      try {
        const response = await fetch("/integrations/file-converter/convert", {
          method: "POST",
          body: formData,
        });

        const result = await response.blob();
        if (response.ok) {
          const fileReader = new FileReader();
          fileReader.onload = () => {
            setConvertedImage(fileReader.result);
          };
          fileReader.readAsDataURL(result);
        } else {
          throw new Error("画像の変換に失敗しました");
        }
      } catch (error) {
        console.error("Image conversion error:", error);
        alert("画像の変換に失敗しました。もう一度やり直してください。");
      }
    } else {
      alert("JPEGまたはPNGイメージをアップロードしてください。");
    }
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      alert("投稿にテキストを入力してください。");
      return;
    }

    if (content.length > 280) {
      alert("コンテンツは280文字以下でなければなりません。");
      return;
    }

    setIsLoading(true);

    try {
      const name = await fetchUserName(session?.user?.id);

      const response = await fetch("/api/db/footer-navigation-icons-users", {
        method: "POST",
        body: JSON.stringify({
          query: `INSERT INTO new_post (name, user_id, content, hushtug, ratings, image) 
                  VALUES (?, ?, ?, ?, ?, ?)`,
          values: [
            name,
            session?.user?.id || null,
            content,
            hashtag ? `#${hashtag}` : null,
            rating,
            convertedImage,
          ],
        }),
      });

      if (response.ok) {
        alert("投稿が正常に送信されました！");
        setContent("");
        setImage(null);
        setConvertedImage("");
        setHashtag("");
        setRating(null);
      } else {
        throw new Error("投稿の送信に失敗しました");
      }
    } catch (error) {
      console.error("投稿の送信エラー:", error);
      alert("投稿の送信に失敗しました。もう一度やり直してください。");
    } finally {
      setIsLoading(false);
    }
  };

  const isPostButtonEnabled = content.trim().length > 0;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="flex justify-between items-center p-4 bg-white border-b">
        <HamburgerMenuCreator isOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <button
          className={`px-4 py-2 rounded-full ${
            isPostButtonEnabled
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={handleSubmit}
          disabled={!isPostButtonEnabled || isLoading}
        >
          {isLoading ? "投稿中..." : "投稿"}
        </button>
      </header>

      <main className="flex-grow p-4 max-w-2xl mx-auto w-full">
        <textarea
          className="w-full p-3 border rounded-lg mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="今何してる？"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={280}
          rows={4}
        ></textarea>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            画像を追加する
          </label>
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {image && convertedImage && (
            <img
              src={convertedImage}
              alt="プレビュー"
              className="mt-2 w-full max-h-64 object-cover rounded-lg"
            />
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            ハッシュタグを追加する
          </label>
          <div className="flex items-center">
            <span className="text-gray-500 text-xl mr-2">#</span>
            <input
              type="text"
              placeholder="ハッシュタグを入力"
              value={hashtag}
              onChange={(e) => setHashtag(e.target.value)}
              className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            投稿を評価する
          </label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star === rating ? null : star)}
                className={`text-3xl focus:outline-none ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
      </main>

      <FooterIconsMenu currentPath="/post" />
    </div>
  );
}

export default MainComponent;