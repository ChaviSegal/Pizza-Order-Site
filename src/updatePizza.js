import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { usePizza } from './pizzaContext';
import './pizzaFormCss.css';

const UpdatePizza = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { pizza } = location.state;
    const { handleSubmit, register, reset, formState: { errors } } = useForm({
        defaultValues: {
            pizzaSize: pizza.pizzaSize,
            toppings: pizza.toppings
        }
    });

    const [toppings, setToppings] = useState(pizza.toppings);
    const { updatePizza } = usePizza();

    useEffect(() => {
        reset({
            pizzaSize: pizza.pizzaSize,
            toppings: pizza.toppings
        });
    }, [pizza, reset]);

    const handleToppingChange = (event) => {
        const value = event.target.value;

        if (value === "ללא תוספות") {
            if (event.target.checked) {
                setToppings(["ללא תוספות"]);
            } else {
                setToppings([]);
            }
        } else {
            setToppings((prevToppings) => {
                if (prevToppings.includes("ללא תוספות")) {
                    return [value];
                } else {
                    if (prevToppings.includes(value)) {
                        return prevToppings.filter((topping) => topping !== value);
                    } else {
                        return [...prevToppings, value];
                    }
                }
            });
        }
    };

    const save = (data) => {
        const updatedPizza = {
            ...pizza,
            pizzaSize: data.pizzaSize,
            toppings: toppings
        };
        updatePizza(updatedPizza);
        navigate('/order', { state: { successMessage: 'השינויים נשמרו בהצלחה!' } });
    };

    const handleCansle = () => {
        navigate('/order');
    };

    return (
        <>
            <h1 className="h1h1">עדכון הפיצה</h1>
            <div className="orderFormContainer">
                <form className="pizzaOrderForm" onSubmit={handleSubmit(save)}>
                    <p>בחר את גודל הפיצה</p>
                    <input type="radio" id="small" name="pizzaSize" value="small" {...register('pizzaSize', { required: "יש לבחור גודל פיצה" })} />
                    <label htmlFor="small">small</label><br />
                    <input type="radio" id="medium" name="pizzaSize" value="medium" {...register('pizzaSize', { required: "יש לבחור גודל פיצה" })} />
                    <label htmlFor="medium">medium</label><br />
                    <input type="radio" id="large" name="pizzaSize" value="large" {...register('pizzaSize', { required: "יש לבחור גודל פיצה" })} />
                    <label htmlFor="large">large</label><br />
                    <input type="radio" id="x-large" name="pizzaSize" value="x-large" {...register('pizzaSize', { required: "יש לבחור גודל פיצה" })} />
                    <label htmlFor="x-large">x-large</label><br />
                    {errors.pizzaSize && <p className="error" style={{ fontSize: "12px", color: "red", border: "solid 1.5px red", marginLeft: "30%", marginRight: "30%" }}>{errors.pizzaSize.message}</p>}

                    <p>בחר את התוספות שתרצה להוסיף על הפיצה</p>
                    <label htmlFor="olives">זיתים</label>
                    <input type="checkBox" id="oliveTopping" name="topping" value="זיתים"
                        {...register('topping')}
                        onChange={handleToppingChange}
                        checked={toppings.includes("זיתים")} /><br />

                    <label htmlFor="onion">בצל</label>
                    <input type="checkBox" id="onionTopping" name="topping" value="בצל"
                        {...register('topping')}
                        onChange={handleToppingChange}
                        checked={toppings.includes("בצל")} /><br />

                    <label htmlFor="tomattos">עגבניות</label>
                    <input type="checkBox" id="tomattosTopping" name="topping" value="עגבנית"
                        {...register('topping')}
                        onChange={handleToppingChange}
                        checked={toppings.includes("עגבניות")} /><br />

                    <label htmlFor="nothing">ללא תוספות</label>
                    <input type="checkBox" id="nothingTopping" name="topping" value="ללא תוספות"
                        {...register('topping')}
                        onChange={handleToppingChange}
                        checked={toppings.includes("ללא תוספות")} /><br />

                    <div className="buttonContainer">
                        <button type="button" className="submitButton" id='cancelButton' onClick={handleCansle}>
                            ביטול
                        </button>
                        <button type="submit" className="submitButton">
                            עדכון
                        </button>
                    </div>
                </form>
            </div>

        </>
    );
};

export default UpdatePizza;
