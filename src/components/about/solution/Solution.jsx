import "./solution.css";
import pages from "./solution-data";
import { Link } from "react-router-dom";
import React from 'react';

const Solution = () => {

  return (
    <section id="solution" className="solution">
    <div className="solution__wrapper">
      <h1 className="solution__title">Готовое решение для вашего бизнеса</h1>
      <div className="solution__container">
        <div className="solution__content">
          {pages.map((page) => (
            <Link
            to={`/solution-${page.link}`}
              key={page.id}
              style={{
                backgroundImage: `linear-gradient(to bottom, #${page.color}FF, #${page.color}00), url(${page.img})`,
              }}
              className={`solution__card solution__card_${page.id}`}
            >
              {page.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
    </section>
 );
};


export default Solution;
