
import Header from "../../components/header/profileHeader/Header.jsx";
import Chat from "../../components/support/Chat.jsx";
import Footer from "../../components/profile/footer/Footer.jsx";
import React, { useState, useRef } from "react";
import "./support.css";

const Profile = () => {

    const role = localStorage.getItem('urole');

  return (
    <>
      <Header />
      <div className="support">
        <div className="support__chat">
        <Chat />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Profile;
