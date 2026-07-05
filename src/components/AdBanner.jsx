import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

export default function AdBanner() {
  const adRef = useRef(null);
  const [ready, setReady] = useState(false);

  // Wait for your page content to finish loading before injecting.
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ready || !adRef.current) return;
    // Prevent double-injection (React StrictMode runs effects twice in dev)
    if (adRef.current.querySelector('script[data-placement]')) return;
    
    const s = document.createElement("script");
    s.src = "https://api2.tomoads.com/tag.js";
    s.dataset.placement = "b44688e9-cc1d-41dc-87b8-8b0ba187fa08";
    s.async = true;
    adRef.current.appendChild(s);
  }, [ready]);

  return (
    <Box 
      sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        my: 4,
        minHeight: "100px", // Give it a minimum height to avoid layout shift when ad loads
      }}
    >
      <div ref={adRef} />
    </Box>
  );
}
