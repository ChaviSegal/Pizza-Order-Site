import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import './pizzaFormCss.css';
import { usePizza } from './pizzaContext';
import { useNavigate } from 'react-router-dom';

const PizzaOrderForm = () => {
    // useForm is used to manage form state and validation
    const { handleSubmit, register, reset, formState: { errors } } = useForm(); 
    const [toppings, setToppings] = useState(["nothing"]);
    const { addPizza } = usePizza();
    const navigate = useNavigate();

    // useEffect initializes the local storage if it doesn't already contain the 'pizzaOrders' array.
    useEffect(() => {
        const existingOrders = JSON.parse(localStorage.getItem('pizzaOrders'));

        if (!existingOrders) {
            const initialOrders = [];
            localStorage.setItem('pizzaOrders', JSON.stringify(initialOrders));
        }
    }, []);

    /**
     * Handles changes in the pizza topping selection.
     * If the "nothing" option is selected, all other toppings are cleared.
     * If any other topping is selected, the "nothing" option is removed from the selection.
     */
    const handleToppingChange = (event) => {
        const value = event.target.value;
    
        if (value === "ללא תוספות") {
            if (event.target.checked) {
                setToppings(["ללא תוספות"]); // Only "nothing" is selected
            } else {
                setToppings([]); // If "nothing" is unchecked, clear the toppings
            }
        } else {
            setToppings((prevToppings) => {
                if (prevToppings.includes("ללא תוספות")) {
                    return [value]; // Replace "nothing" with the selected topping
                } else {
                    if (prevToppings.includes(value)) {
                        return prevToppings.filter((topping) => topping !== value); // Remove topping if already selected
                    } else {
                        return [...prevToppings, value]; // Add new topping to the selection
                    }
                }
            });
        }
    };

    /**
     * Saves the pizza order to local storage and context.
     * After saving, it resets the form and toppings state, then navigates to the order page.
     */
    const save = (data) => {
        const existingOrders = JSON.parse(localStorage.getItem('pizzaOrders')) || [];
        existingOrders.push({ ...data, toppings }); // Add the new order to the existing orders
        localStorage.setItem('pizzaOrders', JSON.stringify(existingOrders)); // Save updated orders to local storage
        const newPizza = { ...data, toppings };
        addPizza(newPizza); // Add the pizza to the context
        console.log("data saved:", existingOrders);
        reset(); // Reset the form fields
        setToppings([]); // Clear the toppings state
        navigate('/order'); // Redirect to the order page
    }

    return (
        <>
            <h1 className="h1h1">עריכת הפיצה</h1>
            <div className="orderFormContainer">
                <form className="pizzaOrderForm" onSubmit={handleSubmit(save)}>
                    <div>
                        <p>בחר את גודל הפיצה</p>
                        <label htmlFor="small">small</label>
                        <input type="radio" id="pizzaSize" name="pizzaSize" value="small" {...register('pizzaSize', { required: "יש לבחור גודל פיצה" })} />
                        <br></br>
                        <label htmlFor="medium">medium</label>
                        <input type="radio" id="pizzaSize" name="pizzaSize" value="medium" {...register('pizzaSize', { required: "יש לבחור גודל פיצה" })} />
                        <br></br>
                        <label htmlFor="large">large</label>
                        <input type="radio" id="pizzaSize" name="pizzaSize" value="large"{...register('pizzaSize', { required: "יש לבחור גודל פיצה" })} />
                        <br></br>
                        <label htmlFor="x-large">x-large</label>
                        <input type="radio" id="pizzaSize" name="pizzaSize" value="x-large"{...register('pizzaSize', { required: "יש לבחור גודל פיצה" })} />
                        <br></br>
                        {errors.pizzaSize && <p className="error" >{errors.pizzaSize.message}</p>}

                        <p>בחר את התוספות שתרצה להוסיף על הפיצה</p>
                        <label htmlFor="olives">זיתים</label>
                        <input type="checkBox" id="oliveTopping" name="topping" value="זיתים"
                            {...register('topping')}
                            onChange={handleToppingChange}
                            checked={toppings.includes("זיתים")} />
                        <br></br>

                        <label htmlFor="onion">בצל</label>
                        <input type="checkBox" id="onionTopping" name="topping" value="בצל"
                            {...register('topping')}
                            onChange={handleToppingChange}
                            checked={toppings.includes("בצל")} />
                        <br></br>

                        <label htmlFor="tomatoes">עגבניות</label>
                        <input type="checkBox" id="tomatoesTopping" name="topping" value="עגבניות"
                            {...register('topping')}
                            onChange={handleToppingChange}
                            checked={toppings.includes("עגבניות")} />
                        <br></br>

                        <label htmlFor="nothing">ללא תוספות</label>
                        <input type="checkBox" id="nothingTopping" name="topping" value="ללא תוספות"
                            {...register('topping')}
                            onChange={handleToppingChange}
                            checked={toppings.includes("ללא תוספות")} />
                        <br></br>
                    </div>
                    <button type="submit" className="submitButton">
                        שלח
                    </button>
                </form>
            </div>
        </>
    );
};

export default PizzaOrderForm;
