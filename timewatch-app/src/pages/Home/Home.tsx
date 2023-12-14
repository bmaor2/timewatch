import React, { useMemo } from "react";
import { Avatar, Button, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import "./home.scss";

const Home: React.FC = () => {
  const pageWidth = useMemo(() => window.innerWidth, [window.innerWidth]);
  const navigate = useNavigate();

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    navigate("/new-clock");
  }
  return (
    <motion.div
      className="home_container"
      transition={{ ease: "easeOut", duration: 1 }}
      animate={{ opacity: [0, 1] }}
    >
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
        onClick={handleClick}
      >
        להגדרת שעון אוטומטי
      </Button>
    </motion.div>
  );
};

export default Home;
