import React, { useMemo } from "react";
import { Avatar, Button, CardContent } from "@mui/material";

import "./home.scss";

const Home: React.FC = () => {
  const pageWidth = useMemo(() => window.innerWidth, [window.innerWidth]);
  return (
    <div className="home_container">
      <Avatar
        src="/images/icon.jpeg"
        alt="main icon"
        variant="rounded"
        className="home_icon"
      />
      <CardContent className="home_text_container">
        <h1
          style={{ fontSize: `${pageWidth / 200}rem` }}
          className="home_title"
        >
          ברוכים הבאים לאפליקציית Timewatch אוטומטי!
        </h1>
        <p
          style={{ fontSize: `${pageWidth / 300}rem` }}
          className="home_description"
        >
          כאן תוכלו להגדיר איזור עבודה ושעות פעילות, ואנחנו נפעיל לכם את השעון
          בצורה אטומטית.
        </p>
      </CardContent>
      <Button
        sx={{ fontSize: `${pageWidth / 400}rem` }}
        variant="contained"
        className="home_button"
      >
        להגדרת שעון אוטומטי
      </Button>
    </div>
  );
};

export default Home;
