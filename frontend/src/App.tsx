import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import GuiaKhipu from "./pages/Guide";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/guia" element={<GuiaKhipu />} />
    </Routes>
  );
}
