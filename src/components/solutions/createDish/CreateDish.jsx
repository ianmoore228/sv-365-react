import "./createDish.css";
import createDishData from "./createDish-data.js";
import { useLocation } from "react-router-dom";
import arrowLeft from "../../../assets/images/solutions/create-dish/block24-arrow-left.png";
import arrowRight from "../../../assets/images/solutions/create-dish/block24-arrow-right.png";
import arrowThree from "../../../assets/images/solutions/create-dish/block24-arrow-three.png";

const CreateDish = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const createDishDataObj = createDishData.find(
    (item) => item.path === currentPath
  );

  const createDishImage1 = createDishDataObj ? createDishDataObj.image1 : "";
  const createDishImage2 = createDishDataObj ? createDishDataObj.image2 : "";
  const createDishImage3 = createDishDataObj ? createDishDataObj.image3 : "";
  const createDishImage4 = createDishDataObj ? createDishDataObj.image4 : "";

  return (
    <div id="createDish" className="create-dish">
      <div className="create-dish__wrapper">
        <h1 className="create-dish__title">Создание блюда</h1>
        <div className="create-dish__container create-dish__container_first">
          <div className="create-dish__left create-dish__left_first">
            <div className="create-dish__card">
              <h2 className="create-dish__subtitle">Тех. Карта</h2>
              <div className="create-dish__card-lists">
                <ul className="create-dish__card-list">
                  <li className="create-dish__card-list-item">
                    <p>Тесто:</p>
                    <hr />
                    <p>450гр</p>
                  </li>
                  <li className="create-dish__card-list-item">
                    <p>Фарш:</p>
                    <hr />
                    <p>200гр</p>
                  </li>
                  <li className="create-dish__card-list-item">
                    <p>Зелень:</p>
                    <hr />
                    <p>42гр</p>
                  </li>
                  <li className="create-dish__card-list-item">
                    <p>Специи:</p>
                    <hr />
                    <p>2гр</p>
                  </li>
                  <li className="create-dish__card-list-item">
                    <p>Вода:</p>
                    <hr />
                    <p>90гр</p>
                  </li>
                  <li className="create-dish__card-list-item">
                    <p>Упаковка:</p>
                    <hr />
                    <p>1шт</p>
                  </li>
                </ul>
                <ul className="create-dish__card-list">
                  <li className="create-dish__card-list-item">
                    Пищевая ценность на 100гр:
                  </li>
                  <li className="create-dish__card-list-item">
                    Калорийность: 108,48 ккал
                  </li>
                  <li className="create-dish__card-list-item">Белки: 7,22 г</li>
                  <li className="create-dish__card-list-item">Жиры: 2,76 г</li>
                  <li className="create-dish__card-list-item">
                    Углеводы: 14,61г
                  </li>
                </ul>
              </div>
              <button className="create-dish__button">Создать блюдо</button>
            </div>
          </div>
          <div className="create-dish__right create-dish__right_first">
            <img
              src={createDishImage1}
              alt="1"
              className="create-dish__image create-dish__image_first"
            />
          </div>
        </div>

        <div className="create-dish__container create-dish__container_second">
          <div className="create-dish__left create-dish__left_second">
            <img
            className="create-dish__image create-dish__image_second"
             src={createDishImage2} alt="2" />
          </div>
          <div className="create-dish__right create-dish__right_second">
            <h2 className="create-dish__subtitle">
              Добавление блюда и корректировка цены
            </h2>
            <p className="create-dish__text">
              Создавайте и добавляйте новые блюда с возможностью гибкой
              настройки цен. Вы можете легко изменять стоимость для:
            </p>
            <ul className="create-dish__list create-dish__list_second">
              <li className="create-dish__list-item">Сайта</li>
              <li className="create-dish__list-item">Приложения</li>
              <li className="create-dish__list-item">Доставки</li>
              <li className="create-dish__list-item">Агрегаторов</li>
            </ul>
            <p className="create-dish__text create-dish__text_second">
              Все изменения автоматически обновляются на всех платформах,
              обеспечивая актуальную информацию для ваших клиентов.
            </p>
            <img
              src={arrowLeft}
              className="create-dish__arrow create-dish__arrow_left arrow"
            />
          </div>
        </div>
        <div className="create-dish__container create-dish__container_third">
          <div className="create-dish__left create-dish__left_third">
          <h2 className="create-dish__subtitle">
          Преимущества программы на POS-системе
            </h2>
          <p className="create-dish__text">
          Удобная POS-система предоставляет вам возможность выбора между различными способами обслуживания:
            </p>
            <ul className="create-dish__list create-dish__list_third">
              <li className="create-dish__list-item">Доставка: Легко оформляйте заказы с доставкой прямо до двери клиента.</li>
              <li className="create-dish__list-item">Самовывоз: Позвольте клиентам быстро забрать свои заказы в заведении.</li>
              <li className="create-dish__list-item">Зал: Удобно обслуживайте гостей на месте, предлагая им уникальные блюда и напитки.</li>
            </ul>
            <p className="create-dish__text">
            Эта функциональность упрощает управление заказами и улучшает клиентский опыт, позволяя вам сосредоточиться на предоставлении отличного сервиса!
            </p>
            <img
              src={arrowRight}
              className="create-dish__arrow create-dish__arrow_right arrow"
            />
              </div>
          <div className="create-dish__right create-dish__right_third">
          <img src={createDishImage3} alt="3" className="create-dish__image create-dish__image_third"/>
          </div>
        </div>
        <div className="create-dish__container create-dish__container_fourth">
          <div className="create-dish__left create-dish__left_fourth">
            <img src={createDishImage4} alt="4"  className="create-dish__image create-dish__image_fourth"/>
          </div>
          <div className="create-dish__right create-dish__right_fourth">
            <h2 className="create-dish__subtitle">Добавляйте свои созданные блюда на агрегаторы и увеличивайте доход!</h2>
            <img src={arrowThree} className="create-dish__arrow create-dish__arrow_three arrow"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDish;
