import React from 'react';
import { useNavigate } from 'react-router-dom';
import './pizzaFormCss.css';

const OrdersList = () => {
    const navigate = useNavigate();
    const ordersList = JSON.parse(localStorage.getItem('orders') || '[]');

    const viewOrderDetails = (order) => {
        navigate('/oneOrder', { state: { order } });
    };

    return (
        <>
            <h1 className='h1h1'>כל ההזמנות : </h1>
            <div className='oneOrder'>
                {ordersList.map((order, index) => (
                    <div key={index}>
                        <div>  שם המזמין : {order.userName}</div>
                        <div>{order.pizzas.length} : כמות </div>
                        <button
                            className="submitButton"
                            type="button"
                            onClick={() => viewOrderDetails(order)}
                        >
                            להצגת פרטי הזמנה
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default OrdersList;
