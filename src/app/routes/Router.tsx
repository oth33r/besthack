import { Routes, Route } from "react-router-dom";
import { MarketplacePage } from "@/pages/MarketplacePage/MarketplacePage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MarketplacePage />} />
    </Routes>
  );
};

export { Router };
