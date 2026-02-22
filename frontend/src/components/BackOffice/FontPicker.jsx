import { useState, useEffect } from "react";

export default function FontPicker({ selectedFont, setSelectedFont, onValidSelection }) {
  const [query, setQuery] = useState("");
  const [fonts, setFonts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [fetchError, setFetchError] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const API_KEY = import.meta.env.VITE_GOOGLE_FONTS_API_KEY;
  const MAX_RESULTS = 5;

  useEffect(() => {
    if (selectedFont?.family) setQuery(selectedFont.family);
  }, [selectedFont?.family]);

  useEffect(() => {
    const fetchFonts = async () => {
      setLoading(true);
      setFetchError("");
      try {
        const res = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}`);
        if (!res.ok) {
          setFetchError("Error al cargar Google Fonts");
          setFonts([]);
          return;
        }

        const data = await res.json();
        setFonts(Array.isArray(data.items) ? data.items : []);
      } catch (error) {
        setFetchError("Error de comunicación con Google Fonts");
        setFonts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFonts();
  }, []);

  const filteredFonts = fonts.filter((font) => font.family.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    setHighlightedIndex(0);
  }, [query]);

  function handleFontClick(font) {
    setSelectedFont(font);
    setQuery(font.family);
    setIsOpen(false);
    onValidSelection?.();
  }

  return (
    <div className="settings">
      <div className="col-md-3">
        <label>TIPOGRAFÍA</label>
        <p>Añade una tipografía de Google Fonts con el buscador integrado</p>
      </div>

      <div className="col-md-9">
        <strong>Fuente:</strong>
        

        {/*MODELOS TIPOGRÁFICOS*/}
        <h1 style={{ fontFamily: selectedFont.family }}>Lorem ipsum dolor sit amet</h1>
        <h2 style={{ fontFamily: selectedFont.family }}>Lorem ipsum dolor sit amet</h2>
        <h3 style={{ fontFamily: selectedFont.family }}>Lorem ipsum dolor sit amet</h3>
        <p style={{ fontFamily: selectedFont.family }}>Lorem ipsum dolor sit amet</p>

        <div classsName="font-picker-wrapper">
            <input
            className="font-picker-field"
          type="text"
          placeholder="Ej: Roboto"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onKeyDown={(e) => {
            if (!isOpen) return;
            if (e.key === "ArrowDown") {
              setHighlightedIndex((prev) => {
                return prev < MAX_RESULTS - 1 ? prev + 1 : prev;
              });
              e.preventDefault();
            } else if (e.key === "ArrowUp") {
              setHighlightedIndex((prev) => {
                return prev > 0 ? prev - 1 : 0;
              });
              e.preventDefault();
            } else if (e.key === "Enter" && isOpen) {
              e.preventDefault();
              if (filteredFonts[highlightedIndex]) {
                return handleFontClick(filteredFonts[highlightedIndex]);
              }
            } else if (e.key === "Escape") {
              return setIsOpen(false);
            }
          }}
        />

        {isOpen && (
          <div
            className="font-picker-dropdown"
          >
            {loading && <p>Cargando...</p>}

            {!loading && fetchError && <p style={{ color: "red" }}>{fetchError}</p>}

            {!loading && !fetchError && query && filteredFonts.length === 0 && (
              <p style={{ color: "gray" }}>No se encontró ningún resultado</p>
            )}

            {!loading &&
              !fetchError &&
              filteredFonts.slice(0, MAX_RESULTS).map((font, index) => {
                return (
                  <div
                    key={`${font.family}-${font.version}`}
                    style={{
                      padding: "5px",
                      cursor: "pointer",
                      background: index === highlightedIndex ? "#eee" : "#fff",
                    }}
                    onClick={() => handleFontClick(font)}
                  >
                    {font.family}
                  </div>
                );
              })}
          </div>
        )}
      </div>
        </div>
        
    </div>
  );
}