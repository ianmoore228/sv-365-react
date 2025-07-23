import "./profile.css";
import Header from "../../components/header/profileHeader/Header.jsx";
import ProfileAbout from "../../components/profile/profileAbout/ProfileAbout.jsx";
import Footer from "../../components/profile/footer/Footer.jsx";
import React, { useState, useRef } from "react";
import Tariffs from "../../components/about/tariffs/Tariffs.jsx";

const Profile = () => {

  return (
    <>
      <Header />
      <div className="profile">
        <ProfileAbout />
        <div className="profile__tariffs">
        <Tariffs />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Profile;
