import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TrainingManagerPage from "./pages/TrainingManagerPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/training-plan" element={<TrainingManagerPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
