import React from "react";
import { ThemeProvider } from "../../pommelogy-frontend/src/contexts/ThemeContext";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import About from "./components/about";
import Home from "./components/home";
import Variety from "./components/variety";
import Index from "./components/contact";
import Search from "./components/search";
import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AppleDetail from "./components/variety/AppleDetail"; // Ensure this import path is correct

function App() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <PrivateRoute element={<Home />} />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/variety",
      element: <Variety />,
    },
    {
      path: "/search",
      element: <Search />,
    },
    {
      path: "/contact",
      element: <Index />,
    },
    {
      path: "/apple-detail",
      element: <AppleDetail />,
    },
  ];

  let routesElement = useRoutes(routesArray);

  return (
    <AuthProvider>
      <ThemeProvider>
        <div className="w-full h-screen flex flex-col">{routesElement}</div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
