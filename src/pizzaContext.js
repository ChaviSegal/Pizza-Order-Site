import React, { createContext, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

const PizzaContext = createContext();

export const PizzaProvider = ({ children }) => {
    
    const [userPizzas, setUserPizzas] = useState([]);
    const [userName, setUserName] = useState('');

    const addPizza = (pizza) => {
        const newPizza = { ...pizza, id: uuidv4() }; // הוספת מזהה ייחודי
        setUserPizzas((prevOrders) => [...prevOrders, newPizza]);
    };

    const updatePizza = (updatedPizza) => {
        setUserPizzas((prevPizzas) =>
            prevPizzas.map((pizza) =>
                pizza.id === updatedPizza.id ? updatedPizza : pizza
            )
        );
    };

    const removePizza = (pizzaId) => {
        setUserPizzas((prevPizzas) =>
            prevPizzas.filter((pizza) => pizza.id !== pizzaId)
        );
    };

    const resetUsersrPizzas = () => {
       setUserPizzas([])
    }

    const saveUserName=(userName) => {
        setUserName(userName)
    }

    const resetUserName= ()=> {
        setUserName('');
    }

    return (
        <PizzaContext.Provider value={{ resetUserName, saveUserName, userPizzas, addPizza, updatePizza, userName, setUserName, removePizza, resetUsersrPizzas }}>
            {children}
        </PizzaContext.Provider>
    );
};

export const usePizza = () => useContext(PizzaContext);
