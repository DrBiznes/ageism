import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { HostPage } from "./pages/HostPage";
import { DisplayPage } from "./pages/DisplayPage";
import { PlayerPage } from "./pages/PlayerPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/host/:sessionId" element={<HostPage />} />
        <Route path="/display/:sessionId" element={<DisplayPage />} />
        <Route path="/join/:code" element={<PlayerPage />} />
      </Routes>
    </BrowserRouter>
  );
}
