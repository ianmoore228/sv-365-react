import "./createApp.css";
import React, { useState, useEffect } from "react";
import CreateAppTop from "./create-app-top/CreateAppTop";
import CreateAppBottom from "./create-app-bottom/CreateAppBottom";

const CreateApp = () => {
  return (
    <div className="solution-create-app">
      <div className="solution-create-app__wrapper">
        <CreateAppTop />
        <CreateAppBottom />
      </div>
    </div>
  );
};

export default CreateApp;
