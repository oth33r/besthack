import { Routes, Route, Navigate } from "react-router-dom";
import {
  Authorization,
  Registration,
  MarketplacePage,
  LotComponent,
} from "@pages";

const Router = () => {
  return (
    <Routes>
      <Route path="/authorization" element={<Authorization />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/" element={<MarketplacePage />} />
      <Route path="/lot/:lotId" element={<LotComponent />} />
      <Route path="*" element={<Navigate to="/authorization" />} />
    </Routes>
  );
};

export { Router };
