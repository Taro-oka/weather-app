import { Route, Routes } from "react-router-dom";
import Home from "@/pages/home/Home";
import Weather from "@/pages/weather/Weather";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/weather" element={<Weather />} />
    </Routes>
  );
}
