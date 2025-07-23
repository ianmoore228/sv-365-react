import React, { useState, useRef, useEffect } from "react";
import "./workplace.css";
import WorkplaceTop from "./workplace-top/WorkplaceTop";
import WorkplaceBottom from "./workplace-bottom/WorkplaceBottom";

const Workplace = () => {
  return (
    <div id="workplace" className="workplace">
      <div className="workplace__wrapper">
        <WorkplaceTop />
        <WorkplaceBottom />
      </div>
    </div>
  );
};

export default Workplace;
