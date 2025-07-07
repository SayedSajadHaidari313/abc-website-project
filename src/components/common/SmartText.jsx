import React from "react";

// Helper function to detect Farsi (Persian) text
function isFarsi(text) {
  return /[\u0600-\u06FF]/.test(text);
}

const SmartText = ({ text = "", maxLength, style = {}, ...props }) => {
  if (!text) return null;
  const farsi = isFarsi(text);
  let displayText = text;
  if (maxLength && text.length > maxLength) {
    displayText = text.slice(0, maxLength) + "...";
  }
  return (
    <div
      style={{
        fontSize: 13,
        color: "#888",
        marginBottom: 8,
        textAlign: farsi ? "right" : undefined,
        direction: farsi ? "rtl" : undefined,
        fontFamily: farsi ? "Vazir, Arial, sans-serif" : undefined,
        ...style,
      }}
      {...props}
    >
      {displayText}
    </div>
  );
};

export default SmartText;
