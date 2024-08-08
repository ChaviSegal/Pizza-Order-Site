import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Order from './order';
import PizzaOrderForm from './pizzaOrederForm';
import OnePizza from './onePizza';
import { PizzaProvider } from './pizzaContext';
import UpdatePizza from './updatePizza'
import OrdersList from './ordersList'
import EndOrder from './endOrder';
import OneOrder from './oneOrder';


function App() {
  return (
    <PizzaProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Order />} />
          <Route path="/pizzaOrderForm" element={<PizzaOrderForm />} />
          <Route path='/onePizza' element={<OnePizza />} />
          <Route path='/order' element={<Order />} />
          <Route path='/updatePizza' element={<UpdatePizza />} />
          <Route path='/ordersList' element={<OrdersList />} />
          <Route path='/endOrder' element={<EndOrder />} />
          <Route path='/oneOrder' element={<OneOrder />} />
        </Routes>
      </Router>
    </PizzaProvider>
  );
}

export default App;