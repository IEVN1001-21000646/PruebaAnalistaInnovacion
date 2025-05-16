import React, { useState } from "react";
import axios from "axios";

const API_KEY = "AIzaSyBLfC_k8aZrf_lkmEq9tmqsTVq1Z5IeMuo";

export default function VideoSearch({ onAddFavorite }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            part: "snippet",
            q: query,
            type: "video",
            key: API_KEY,
            maxResults: 10,
          },
        }
      );
      setResults(res.data.items);
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    }
  };

  const addToFavorites = (video) => {
    const fav = {
      id: video.id.videoId,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.default.url,
    };

    const existing = JSON.parse(localStorage.getItem("favoritos")) || [];
    const updated = [...existing, fav];
    localStorage.setItem("favoritos", JSON.stringify(updated));

    onAddFavorite();
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h3 style={{ marginBottom: "1rem" }}>Buscar videos</h3>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Buscar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "0.5rem", flex: "1", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#ff0000",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Buscar
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {results.map((video) => (
          <div
            key={video.id.videoId}
            style={{
              width: "200px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "0.5rem",
              backgroundColor: "#f9f9f9",
            }}
          >
            <img
              src={video.snippet.thumbnails.default.url}
              alt={video.snippet.title}
              style={{ width: "100%", borderRadius: "4px" }}
            />
            <p style={{ fontSize: "0.9rem", margin: "0.5rem 0" }}>{video.snippet.title}</p>
            <button
              onClick={() => addToFavorites(video)}
              style={{
                padding: "0.4rem 0.6rem",
                backgroundColor: "#ffd700",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                width: "100%",
              }}
            >
              ⭐ Agregar a favoritos
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
