import { Routes, Route, Navigate } from "react-router-dom";
import { Authorization, Registration, LotComponent } from "@pages";

const Router = () => {
  return (
    <Routes>
      <Route path="/authorization" element={<Authorization />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/" element={<div>Home</div>} />
      <Route path="*" element={<Navigate to="/authorization" />} />
      <Route path="/lot/:lotId" element={<LotComponent />} />
    </Routes>
  );
};

export { Router };
