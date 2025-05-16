import React, { useEffect, useState } from "react";

export default function FavoritesList({ update }) {
  const [favoritos, setFavoritos] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(favs);
    setFiltered(favs);
  }, [update]);

  const removeFavorite = (id) => {
    const newFavs = favoritos.filter((v) => v.id !== id);
    localStorage.setItem("favoritos", JSON.stringify(newFavs));
    setFavoritos(newFavs);
    setFiltered(newFavs.filter((v) =>
      v.title.toLowerCase().includes(search.toLowerCase())
    ));
  };

  const handleSearch = () => {
    const result = favoritos.filter((v) =>
      v.title.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h3 style={{ marginBottom: "1rem" }}>Mis Favoritos</h3>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1rem",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Buscar favorito..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "0.5rem",
            width: "100%",
            maxWidth: "300px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#cc0000", // rojo tipo YouTube
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          🔍 Buscar
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        {filtered.map((video) => (
          <div
            key={video.id}
            style={{
              width: "200px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "0.5rem",
              backgroundColor: "#f9f9f9",
            }}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              style={{ width: "100%", borderRadius: "4px" }}
            />
            <p style={{ fontSize: "0.9rem", margin: "0.5rem 0" }}>{video.title}</p>
            <button
              onClick={() => removeFavorite(video.id)}
              style={{
                padding: "0.4rem 0.6rem",
                backgroundColor: "#cc0000",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                width: "100%",
              }}
            >
              ❌ Quitar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
