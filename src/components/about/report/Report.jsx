import img1 from "../../../assets/images/about/report/block7_bg.png";
import img2 from "../../../assets/images/about/report/block7_logos.png";
import "./report.css";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Report = () => {
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true });

  return (
    <section id="report" className="report">
      <div className="report__wrapper">
        <div className="report__container report__container_left">
          <motion.img
          ref={ref}
                  initial={{
                    x: isInView ? -150 : -150,
                    opacity: isInView ? 0 : 0,
                  }}
                  animate={{
                    x: isInView ? 0 : -150,
                    opacity: isInView ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2,
                    type: "spring",
                  }}
           className="report__image" src={img1} />
        </div>
        <div className="report__container report__container_right">
          <motion.h1
            ref={ref}
            initial={{
              y: isInView ? -200 : 0,
              opacity: isInView ? 0 : 0,
            }}
            animate={{
              y: isInView ? 0 : -200,
              opacity: isInView ? 1 : 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              type: "spring",
            }}
            className="report__title"
          >
            Формирование и автоматическая отправка отчетов
          </motion.h1>
          <motion.img
            ref={ref}
                  initial={{
                    x: isInView ? 50 : 50,
                    opacity: isInView ? 0 : 0,
                  }}
                  animate={{
                    x: isInView ? 0 : 50,
                    opacity: isInView ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2,
                    type: "spring",
                  }}
           className="report__logos" src={img2} />
          <motion.div 
           ref={ref}
              initial={{
                opacity: isInView ? 0 : 0,
              }}
              animate={{
                opacity: isInView ? 1 : 0,
              }}
              transition={{
                duration: 1.2,
                delay: 0.2,
                type: "spring",
              }}
          className="report__text-content">
            <motion.p
              ref={ref}
              initial={{
                scale: isInView ? 0.5 : 0.5,
                opacity: isInView ? 0 : 0,
              }}
              animate={{
                scale: isInView ? 1 : 0.5,
                opacity: isInView ? 1 : 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                type: "spring",
              }}
              className="report__text"
            >
              Отчеты играют важную роль в бизнесе, предоставляя информацию о
              ключевых показателях, результаты анализов и общее состояние
              компании. Автоматическая отправка отчетов становится незаменимым
              инструментом для оптимизации рабочего процесса
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Report;
