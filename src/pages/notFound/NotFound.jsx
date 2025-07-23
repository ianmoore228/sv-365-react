import "./notFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="notFound">
        <div className="notFound__wrapper">
            <h1 className="notFound__title">404</h1>
            <p className="notFound__text">Страница не найдена</p>
            <Link to="/" className="notFound__link">Вернуться на главную</Link>
        </div>
        </div>
    );
}

export default NotFound;

