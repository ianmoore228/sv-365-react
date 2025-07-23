import "./sellingPoints.css";
import sellingPointsData from "./sellingPoints-data";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sellingPoints = () => {

  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {
      setActiveCardIndex((prevIndex) => (prevIndex + 1) % sellingPointsData.length);
    }, 3000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="selling-points">
      <div className="selling-points__wrapper">
        <h1 className="selling-points__title">Удобство работы с системой</h1>
        <h1 className="selling-points__logo">“S V I S T U N O V”</h1>
        <h3 className="selling-points__subtitle">Отлично подойдет для автоматизации кафе</h3>
        <div className="selling-points__container">
        {sellingPointsData.map((sellingPoint, index) => (
            <motion.div
              key={sellingPoint.id}
              className="selling-points__card"
              animate={{
                outline: index === activeCardIndex ? "3px solid #ffffff" : "3px solid #ffffff00",
              }}
              transition={{ duration: 0.5 }} 
            >
              <div className="selling-points__card-wrapper">
                <h3 className="selling-points__card-title">
                  {sellingPoint.title}
                </h3>
                <p className="selling-points__card-text">{sellingPoint.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default sellingPoints;
