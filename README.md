# Pizza Ordering Website

A React-based web application for ordering pizzas. This project allows users to customize their pizza orders and submit them. Administrators can also manage and approve orders.

## Features

- **Pizza Customization**: Users can choose the size of their pizza and select from a variety of toppings.
- **Order Management**: Admins can view, manage, and approve pizza orders.
- **User-Friendly Interface**: Simple and intuitive design for easy navigation and use.
- **Context API and Local Storage**: Utilizes React Context API for state management and local storage to persist orders.

## Pages

### 1. Ordering Page (Client Side)
- Allows users to add a new pizza, edit an existing pizza, and submit their order.
- Requires users to enter their name and select pizza options.

### 2. Pizza Editing Page (Client Side)
- Users can choose the pizza size and add toppings.
- Includes buttons to save or cancel changes.

### 3. Order Management Page (Admin Side)
- Displays a list of all orders with the option to view the details of each order.

### 4. Order Details Page (Admin Side)
- Shows the details of a specific order with the option to approve the order.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/Pizza-Ordering-Website.git
    ```

2. Navigate to the project directory:
    ```bash
    cd Pizza-Ordering-Website
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm start
    ```

## Usage

- **Adding a Pizza**: Users can add pizzas by navigating to the order form and selecting their preferred size and toppings.
- **Editing a Pizza**: Users can edit their pizza selections before submitting the order.
- **Submitting an Order**: Once the order is finalized, users can submit it, and it will be saved in local storage.
- **Managing Orders**: Admins can view and manage all orders, including approving or rejecting them.

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **React Hook Form**: For managing form state and validation.
- **React Router**: For client-side routing.
- **UUID**: For generating unique IDs for orders.
- **CSS**: Custom styles for the application.

## Contributing

Feel free to fork the repository and submit pull requests. For major changes, please open an issue to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.