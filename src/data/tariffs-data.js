const tariffs = [
  {
      id: 1,
      path: "/tariff-start",
      link: "start",
      title: "Стартовый",
      name: "start",
      price: 990,
      monthlyPaymentPrice: 1590, 
      oldPrice: 2500,
      points: ["Cайт-конструктор (1 шаблон)", "1 точка, 1 бренд", "Бонусы и акции", "Управление складом", "Управление кухней"]
  },
  {
      id: 2,
      path: "/tariff-regional",
      link: "regional",
      title: "Региональный",
      name: "regional",
      price: 1099,
      monthlyPaymentPrice: 1990, 
      oldPrice: 2500,
      points: ["Cайт-конструктор (2 шаблона)", "Неограниченное количество точек, мультибренд", "Бонусы и акции", "Управление складом", "Управление кухней"]
  },
  {
      id: 3,
      path: "/tariff-regional-pro",
      link: "regional-pro",
      title: "Региональный PRO",
      name: "regional_pro",
      price: 1290,
      monthlyPaymentPrice: 2590, 
      oldPrice: 3000,
      points: ["Cайт-конструктор (2 шаблона)", "Неограниченное количество точек, мультибренд", "Бонусы и акции", "Управление складом", "Управление кухней"]
  },
  {
      id: 4,
      path: "/tariff-federal",
      link: "federal",
      title: "Федеральный",
      name: "federal",
      price: 3990,
      monthlyPaymentPrice: 5990, 
      oldPrice: 4500,
      points: ["Cайт-конструктор (2 шаблона)", "Неограниченное количество точек, мультибренд", "Бонусы и акции", "Управление складом", "Управление кухней", "СММ планнер + tg планнер"]
  },
  {
      id: 5,
      path: "/tariff-federal-pro",
      link: "federal-pro",
      title: "Федеральный PRO",
      points: ["Cайт-конструктор (2 шаблона)", "Неограниченное количество точек, мультибренд", "Бонусы и акции", "Управление складом", "Управление кухней", "СММ планнер + tg планнер", "Приложения для директора, администратора, повара"],
      name: "federal_pro",
      price: 4990,
      monthlyPaymentPrice: 6990, 
      oldPrice: 6500
  }
]
  
  export default tariffs;
  