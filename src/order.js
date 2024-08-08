import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from 'react-router-dom';
import OnePizza from "./onePizza";
import { usePizza } from './pizzaContext';
import { v4 as uuidv4 } from 'uuid';
import './pizzaFormCss.css';

const Ordar = () => {

    // useForm is used to manage form state and validation
    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const { userPizzas, userName, setUserName, resetUsersrPizzas, resetUserName } = usePizza();
    const [isFormVisible, setFormVisible] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    /**
     * useEffect to display a success message from the previous page, if available.
     * The message disappears after 3 seconds.
     */
    useEffect(() => {
        if (location.state?.successMessage) {
            setSuccessMessage(location.state.successMessage);
            const timer = setTimeout(() => setSuccessMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [location.state]);

    /**
     * useEffect to hide the form if a userName is already set.
     */
    useEffect(() => {
        if (userName) {
            setFormVisible(false);
        }
    }, [userName]);

    /**
     * Handles navigation to the pizza order form.
     * Sets the userName and navigates to the pizza order form if the userName is provided.
     * Displays an error message if the userName is missing.
     */
    const handleNavigate = (data) => {
        if (data.userName) {
            setUserName(data.userName);
            navigate('/pizzaOrderForm');
            setFormVisible(false);
        } else {
            setErrorMessage("יש להכניס שם משתמש");
        }
    };

    /**
     * Navigates to the pizza order form for adding a new pizza.
     */
    const addPizza = () => {
        navigate('/pizzaOrderForm');
    };

    /**
     * Sends the current order by saving it to local storage.
     * Displays a success message and resets the user's pizzas and name after 3 seconds.
     */
    const sendOrder = () => {
        if (userPizzas.length === 0) {
            setErrorMessage("לא ניתן לשלוח הזמנה ללא פיצות");
            return;
        }
        const order = {
            id: uuidv4(),
            userName,
            pizzas: userPizzas
        };
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        setSuccessMessage("ההזמנה נשלחה בהצלחה!");

        setTimeout(() => {
            navigate('/EndOrder');
            setFormVisible(false);
            resetUsersrPizzas(); // Reset the user's pizzas in the context
            resetUserName(); // Reset the user's name in the context
        }, 3000);
    };

    return (
        <>
            <div className="orderCntainer">
                <form className="orderForm" onSubmit={handleSubmit(handleNavigate)}>
                    {isFormVisible && (<>
                        <label htmlFor="name">הקלד שם מלא</label>
                        <br />
                        <input
                            type="text"
                            id="userName"
                            {...register('userName', { required: { value: true, message: "יש להכניס שם משתמש" } })}
                        />
                        <br />
                        {errors.userName && (
                            <p className="error" style={{ fontSize: "12px", color: "red", border: "solid 1.5px red", marginLeft: "30%", marginRight: "30%" }}>
                                {errors.userName.message}
                            </p>
                        )}
                        <br />
                        <button
                            className="submitButton"
                            type="submit"
                            onClick={handleSubmit(handleNavigate)}>
                            להתחלת הזמנה
                        </button>
                    </>)}
                </form>

                {!isFormVisible && <h1 className="greetingMassege">שלום {userName}, ההזמנה שלך:</h1>}
                <div className="eachPizzaContainer">
                    {userPizzas.map((pizza, index) => (
                        <div key={index}>
                            <OnePizza pizza={pizza} />
                        </div>
                    ))}
                </div>
                <div>
                    {!isFormVisible && <button
                        className="submitButton"
                        type="button"
                        id="addAPizza"
                        onClick={addPizza}>
                        הוסף פיצה
                    </button>}
                    <br />
                </div>
                {successMessage && <p className="success">{successMessage}</p>}
                {errorMessage && <p className="error2" >{errorMessage}</p>}
                {userPizzas.length > 0 && <button
                    id="sendOrder"
                    className="submitButton"
                    type="button"
                    onClick={sendOrder}>
                    שלח הזמנה
                </button>}
                <br />
            </div>
        </>
    );
}

export default Ordar;
