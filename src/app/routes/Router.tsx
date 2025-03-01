import { Routes, Route } from "react-router-dom";
import { MarketplacePage } from "@/pages/MarketplacePage/MarketplacePage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/marketplace" element={<MarketplacePage />} />
    </Routes>
  );
};

export { Router };
