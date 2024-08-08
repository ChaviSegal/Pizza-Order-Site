import { useNavigate } from 'react-router-dom';
import { usePizza } from './pizzaContext';
import './pizzaFormCss.css';

const OnPizza = ({ pizza }) => {
    const { userPizzas, userName, setUserName, removePizza } = usePizza();
    const navigate = useNavigate();

    const handleChangingPizza = () => {
        navigate('/updatePizza', { state: { pizza } });
    }

    const handleDelet = (pizzaId) => {
        removePizza(pizzaId)
    }

    return (
        <>
            <div className='pizzContainer'>
                <div className="pizzaDetails">
                    {/* <div >{userName} : שם</div> */}
                    <div > גודל הפיצה : {pizza.pizzaSize}</div>
                    <div >  תוספות : {pizza.toppings.join(", ")}</div>
                </div>
                <div className="updatingButtons">
                    <button
                        id='updateButton'
                        className="submitButton"
                        type="submit"
                        onClick={handleChangingPizza}>
                        עריכה
                    </button>

                    <button
                        id='deleteButton'
                        className="submitButton"
                        type="submit"
                        onClick={() => handleDelet(pizza.id)}>
                        מחיקה
                    </button>
                </div>
            </div>
        </>
    );
}

export default OnPizza;
