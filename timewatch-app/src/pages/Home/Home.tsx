import React from "react";
import { Avatar, Button, CardContent } from "@mui/material";

import "./home.scss";

const Home: React.FC = () => {
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
          style={{ fontSize: `${window.innerWidth / 200}rem` }}
          className="home_title"
        >
          ברוכים הבאים לאפליקציית Timewatch אוטומטי!
        </h1>
        <p
          style={{ fontSize: `${window.innerWidth / 300}rem` }}
          className="home_description"
        >
          כאן תוכלו להגדיר איזור עבודה ושעות פעילות, ואנחנו נפעיל לכם את השעון
          בצורה אטומטית.
        </p>
      </CardContent>
      <Button
        sx={{ fontSize: `${window.innerWidth / 400}rem` }}
        variant="contained"
        className="home_button"
      >
        להגדרת שעון אוטומטי
      </Button>
    </div>
  );
};

export default Home;
