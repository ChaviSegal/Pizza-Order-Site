import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './pizzaFormCss.css';

const OneOrder = () => {
    const location = useLocation();
    const { order } = location.state || {};
    const navigate = useNavigate();

    if (!order) {
        return <div>ההזמנה לא נמצאה</div>;
    }

    const confirmOrder = () => {
        const ordersList = JSON.parse(localStorage.getItem('orders') || '[]');
        const updatedOrdersList = ordersList.filter(o => o.id !== order.id);
        localStorage.setItem('orders', JSON.stringify(updatedOrdersList));
        navigate('/ordersList');
    }
    return (
        <>
            <div className="orderDetails">
                <div>שם: {order.userName}</div>
                {order.pizzas.map((pizza, index) => (
                    <ul>
                        <div key={index}>
                            <li>
                                <div></div>
                                {index+1}
                                <div> {pizza.pizzaSize}  : גודל הפיצה </div>
                                <div>  תוספות : {pizza.toppings.join(", ")}</div>
                            </li>
                        </div>
                    </ul>
                ))}
                <button
                    className="submitButton"
                    type="submit"
                    onClick={confirmOrder}>
                    אשר הזמנה
                </button>
            </div>
        </>
    );
}

export default OneOrder;