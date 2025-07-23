import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import background from "../../../assets/images/about/tariffs/tariffs_bg.png";
import "./tariffs.css";
import { setTariffs, setLoading, setError } from '../../../redux/tariffSlice';
import { useDispatch, useSelector } from 'react-redux';
import tariffs from '../../../data/tariffs-data';

const Tariffs = () => {
  // const dispatch = useDispatch();
  // const { tariffs } = useSelector((state) => state.tariffs);

  // useEffect(() => {

  //   const fetchTariffs = async () => {
  //     dispatch(setLoading(true))
  //     try {
  //       const response = await fetch(
  //         "https://xn--j1a5b.xn--b1ampelchila.xn--p1ai/v1/tariff",
  //         {
  //           method: "GET",
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error(`Ошибка: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       dispatch(setTariffs(data));
  //       dispatch(setLoading(false))
    
  //     } catch (error) {
  //       dispatch(setError(error))
  //       console.error("Ошибка:", error);
  //     }
  //   };

  //   fetchTariffs();
  // }, [dispatch]); 


  const location = useLocation();
  const currentPath = location.pathname;

  const [checkedCards, setCheckedCards] = useState({});

  useEffect(() => {
    if (tariffs.length > 0) {
      const initialCheckedCards = tariffs.reduce((acc, tariff) => {
        acc[tariff.id] = true; 
        return acc;
      }, {});
      setCheckedCards(initialCheckedCards);
    }
  }, [tariffs]); 

  
  const handleCheckboxChange = (id) => {
    setCheckedCards((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <section id="tariffs" className="tariffs">
      {currentPath !== "/profile" && (
        <img
          src={background}
          className="tariffs__background"
          alt="Background"
        />
      )}
      <div className="tariffs__wrapper">
        <h1 className="tariffs__title">Тарифы</h1>
        <div className="tariffs__container">
          {tariffs.map((tariff) => {
            const isChecked = checkedCards[tariff.id] || false;

            return (
              <div key={tariff.id} className="tariffs__item">
                <h3 className="tariffs__item-title">{tariff.name}</h3>
                <div className="tariffs__item-inner-border">
                  <div className="tariffs__item-inner">
                    <motion.p
                      className="tariffs__item-oldprice"
                      initial={{
                        scale: isChecked ? 0.5 : 1,
                        opacity: isChecked ? 0 : 1,
                      }}
                      animate={{
                        scale: isChecked ? 1 : 0.5,
                        opacity: isChecked ? 1 : 0,
                      }}
                    >
                      {tariff.monthlyPaymentPrice} ₽ / мес.
                    </motion.p>
                    <motion.p className="tariffs__item-newprice">
                      {isChecked ? tariff.price : tariff.monthlyPaymentPrice} ₽
                      / мес.
                    </motion.p>
                    <motion.div
                      className="tariffs__item-switch"
                      initial={{ x: 0 }}
                      animate={{ x: isChecked ? 30 : 0 }}
                    ></motion.div>
                    <motion.input
                      type="checkbox"
                      checked={isChecked}
                      style={{
                        backgroundColor: isChecked ? "#4A5767" : "#222C37",
                      }}
                      onChange={() => handleCheckboxChange(tariff.id)}
                      className="tariffs__item-checkbox"
                    ></motion.input>
                    {isChecked ? (
                      <p className="tariffs__item-description">
                        При оплате за год
                      </p>
                    ) : (
                      <p className="tariffs__item-description">
                        При оплате за месяц
                      </p>
                    )}
                  </div>
                </div>
                <Link
                  to={`/tariff-${tariff.link}`}
                  className="button tariffs__item-button"
                >
                  Подробнее
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Tariffs;
