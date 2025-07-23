import Pay from "../../components/payment/pay/Pay.jsx";
import Header from "../../components/header/profileHeader/Header.jsx";
import Footer from "../../components/profile/footer/Footer.jsx";
import "./payment.css";

const Payment = () => {
    return (
        <div className="payment">
        <Header />
            <Pay />
            <Footer />
        </div>
    );
};

export default Payment;