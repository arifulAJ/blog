import axios from "axios";
import React, { useState } from "react";

function AvatarUpload({ onAvatarChange }) {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [useUrl, setUseUrl] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUrl(""); // Clear the URL input when a file is selected
    setUseUrl(false); // Ensure that URL input is hidden
  };

  const handleUrlChange = (e) => {
    const enteredUrl = e.target.value;
    setUrl(enteredUrl);
    setFile(null); // Clear the file selection when a URL is entered
    setUseUrl(true); // Show the URL input
  };

  const uploadFile = async (type) => {
    const data = new FormData();

    if (type === "image" && file instanceof File) {
      data.append("file", file);
      data.append("upload_preset", "image_preset");

      // Logging here will show the correct data with appended values
    }
    try {
      setIsUploading(true);
      let cloudeName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;

      let resoceType = "image";
      console.log(resoceType);
      let api = `https://api.cloudinary.com/v1_1/${cloudeName}/${resoceType}/upload`;
      console.log(api);
      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      console.log(secure_url);
      return secure_url;
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsUploading(false);
    }
  };
  const handleUpload = async () => {
    // You can add additional validation or checks here
    if (useUrl && url.trim() !== "") {
      // Handle the chosen avatar (URL)
      onAvatarChange(url);
    } else if (!useUrl && file && file instanceof File) {
      // Handle the chosen avatar (file)
      try {
        const imgUrl = await uploadFile("image");
        console.log(imgUrl);
        onAvatarChange(imgUrl);
      } catch (error) {
        console.error(error.message);
      }
      // onAvatarChange(file);
    }
  };

  return (
    <div>
      {isUploading ? <p>this is lodading</p> : ""}
      <label
        htmlFor="avatar"
        className="block text-sm font-medium text-gray-700"
      ></label>
      <div className="mb-2 py-4 border px-1 rounded">
        <label>
          <input
            type="radio"
            name="avatarType"
            value="file"
            checked={!useUrl}
            onChange={() => setUseUrl(false)}
          />
          Upload your cover Image
        </label>
        <br />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading || useUrl}
        />
      </div>
      <div className="mb-2 py-4 border px-1 rounded">
        <label>
          <input
            type="radio"
            name="avatarType"
            value="url"
            checked={useUrl}
            onChange={() => setUseUrl(true)}
          />
          Paste your image url
        </label>
        <br />
        <input
          type="text"
          placeholder="Paste URL"
          value={url}
          onChange={handleUrlChange}
          disabled={isUploading || !useUrl}
        />
      </div>
      <button
        className="bg-button-color text-white px-4 py-2 rounded hover:bg-hover-effect focus:outline-none focus:ring-2 focus:ring-button-color"
        onClick={handleUpload}
        disabled={isUploading}
      >
        Upload Cover
      </button>
    </div>
  );
}

export default AvatarUpload;