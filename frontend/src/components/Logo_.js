import React, { useState, useEffect } from "react";

const Logo_ = () => {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const logoText = "Loading..";

  return (
    <div
      style={{
        position: "fixed",
        marginLeft: '-100',
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        visibility: showLogo ? "visible" : "hidden",
        pointerEvents: showLogo ? "auto" : "none",
        zIndex: 9999,
      }}
    >
      <svg width="320" height="150" viewBox="0 0 300 100">
        <text
          x="50%"
          y="50%"
          fontSize="30"
          fill="black"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {logoText}
        </text>

        {[...Array(30)].map((_, index) => (
          <circle
            key={index}
            cx={Math.random() * 300}
            cy={Math.random() * 100}
            r={Math.random() * 5 + 1} // 원의 크기
            fill="grey" // 색상
          >
            <animateMotion
              dur={`${Math.random() * 5 + 2}s`}
              repeatCount="indefinite"
              path={`M${Math.random() * 300} ${Math.random() * 100} L150 50 Z`}
              rotate="auto"
            />
          </circle>
        ))}
      </svg>
    </div>
  );
};

export default Logo_;
