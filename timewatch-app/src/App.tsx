import React, { useEffect } from "react";
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
import { Loader } from "@googlemaps/js-api-loader";
import { useAsyncEffect } from "@hilma/tools";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const loader = new Loader({
  apiKey: API_KEY,
  version: "weekly",
  region: "IL",
});

export const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<Navigate replace to="/home" />} />,
    <Route path="/home" element={<Home />} />,
    <Route path="/new-clock" element={<NewClock />} />,
  ])
);

const App: React.FC = () => {
  useAsyncEffect(async () => {
    await loader.importLibrary("places");
  }, []);
  return <RouterProvider router={router} />;
};

export default App;
