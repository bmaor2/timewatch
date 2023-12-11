import React from "react";
import {
  Route,
  Navigate,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Home from "./pages/Home/Home.tsx";
import NewClock from "./pages/NewClock/NewClock.tsx";
import "./common/styles/main.scss";

export const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<Navigate replace to="/home" />} />,
    <Route path="/home" element={<Home />} />,
    <Route path="/new-clock" element={<NewClock />} />,
  ])
);

const App: React.FC = () => <RouterProvider router={router} />;

export default App;
