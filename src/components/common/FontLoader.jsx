import { useEffect } from "react";

const FontLoader = () => {
  useEffect(() => {
    // Load fonts using the Font Loading API
    const loadFonts = async () => {
      if ("fonts" in document) {
        try {
          // Load critical fonts first
          await Promise.all([
            document.fonts.load("400 1em Jost"),
            document.fonts.load("500 1em Jost"),
            document.fonts.load("600 1em Jost"),
          ]);

          // Mark critical fonts as loaded
          document.documentElement.classList.add("fonts-loaded");

          // Load remaining font weights asynchronously
          const nonCriticalFonts = [
            "300 1em Jost",
            "700 1em Jost",
            "800 1em Jost",
            "900 1em Jost",
            "italic 300 1em Jost",
            "italic 400 1em Jost",
            "italic 500 1em Jost",
            "italic 600 1em Jost",
            "italic 700 1em Jost",
            "italic 800 1em Jost",
            "italic 900 1em Jost",
          ];

          // Load non-critical fonts in the background
          Promise.all(
            nonCriticalFonts.map((font) => document.fonts.load(font))
          ).then(() => {
            document.documentElement.classList.add("all-fonts-loaded");
          });
        } catch (error) {
          console.error("Error loading fonts:", error);
        }
      }
    };

    loadFonts();
  }, []);

  return null;
};

export default FontLoader;
