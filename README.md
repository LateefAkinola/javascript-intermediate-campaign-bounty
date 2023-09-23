# LATINO'S ONLINE BOOKSTORE: JavaScript Code Explanation
![Screenshot (422)](https://github.com/LateefAkinola/javascript-intermediate-campaign-bounty/assets/105966848/3b41d88e-f78c-4e28-a751-90886b9d5c28)

In this Markdown file, we'll provide a step-by-step and detailed explanation of the provided JavaScript code for a simple online bookstore application. The code allows users to view books, add them to a cart, check out, and perform various actions.

## Table of Contents
- [Introduction](#introduction)
- [Book Class](#book-class)
- [Initializing Books](#initializing-books)
- [Displaying Books](#displaying-books)
- [User Actions](#user-actions)
- [Toggling Book Details](#toggling-book-details)
- [Adding Books to the Cart](#adding-books-to-the-cart)
- [Displaying the Cart](#displaying-the-cart)
- [Checkout Process](#checkout-process)
- [Clearing the Cart](#clearing-the-cart)
- [Toggling Cart Visibility](#toggling-cart-visibility)
- [Adding a Book to the Store](#adding-a-book-to-the-store)
- [Conclusion](#conclusion)

---

## Introduction

This JavaScript code represents a simple online bookstore application. Users can view books, add them to a cart, check out, and more. We'll explain each part of the code in detail.

---

## Book Class

### `class Book`

- This class defines the structure of a book object.
- It has properties such as `title`, `author`, `price`, and `stockQuantity`.
- A `constructor` initializes these properties when a book object is created.

    ```javascript
    class Book {
        constructor(title, author, price, stockQuantity) {
            this.title = title;
            this.author = author;
            this.price = price;
            this.stockQuantity = stockQuantity;
        }
    }
    ```

---

## Initializing Books

### `const books`

- An array of `Book` objects is initialized, representing the available books in the store.
- Each book object is created with a title, author, price, and stock quantity.

    ```javascript
    const books = [
        new Book("A Tale of Two Cities", "Charles Dickens", 55.99, 108),
        new Book("The Hobbit", "J. R. R. Tolkien", 120.99, 90),
        new Book("The Da Vinci Code", "Dan Brown", 109.99, 50),
    ];
    ```

---

## Displaying Books

### `function displayBooks()`

- This function populates the webpage with book information.
- It creates HTML elements for each book and displays details like title, author, price, and stock quantity.
- Users can click a button to toggle book details visibility.
- The "Add to Cart" button allows adding books to the cart, but it checks if the book is in stock.

    ```javascript
    function displayBooks() {
        const booksContainer = document.getElementById("books");
        booksContainer.innerHTML = "";

        books.forEach((book, index) => {
            const bookElement = document.createElement("div");
            bookElement.classList.add("book");
            bookElement.setAttribute("id", `book-${index}`);
            bookElement.innerHTML = `
                <div class="book-details">
                    <p><strong>Title:</strong> ${book.title}</p>
                    <p class="author hidden"><strong>Author:</strong> ${book.author}</p>
                    <p class="price hidden"><strong>Price:</strong> $${book.price}</p>
                    <p class="stock hidden"><strong>Stock Quantity:</strong> ${book.stockQuantity}</p>
                </div>
                <button onclick="toggleBookDetails(${index})">View Book Details</button>
                <button onclick="handleUserAction('add', ${index})" ${book.stockQuantity === 0 ? 'disabled' : ''}>Add to Cart</button>
            `;
            booksContainer.appendChild(bookElement);
        });
    }
    ```

---

## User Actions

### `function handleUserAction(action, index)`

- This function handles user actions based on the provided action type and book index.
- Actions include viewing details, adding to the cart, checking out, clearing the cart, and toggling cart visibility.
- It uses a `switch statement` to determine the action.

#### Using Switch Statements

- Inside `handleUserAction`, switch statements are used to determine the action type and execute the corresponding code block.
- This approach keeps the code organized and makes it easy to add new actions in the future

    ```javascript
    function handleUserAction(action, index) {
        switch (action) {
            case 'view':
                toggleBookDetails(index);
                break;
            case 'add':
                addToCart(index);
                break;
            case 'checkout':
                checkout();
                break;
            case 'clearCart':
                clearCart();
                break;
            case 'toggleCart':
                toggleCart();
                break;
            default:
                alert("Invalid action.");
        }
    }
    ```

---

## Toggling Book Details

### `function toggleBookDetails(index)`

- Toggles the visibility of book details (author, price, and stock quantity) when the user clicks the "View Book Details" button.
- It uses `classList.toggle` to add or remove the "hidden" class.

    ```javascript
    function toggleBookDetails(index) {
        const bookDetails = document.querySelector(`#book-${index} .book-details`);
        const author = document.querySelector(`#book-${index} .author`);
        const price = document.querySelector(`#book-${index} .price`);
        const stock = document.querySelector(`#book-${index} .stock`);
        const button = document.querySelector(`#book-${index} button`);

        author.classList.toggle("hidden");
        price.classList.toggle("hidden");
        stock.classList.toggle("hidden");

        if (author.classList.contains("hidden")) {
            button.textContent = "View Book Details";
        } else {
            button.textContent = "Hide Book Details";
        }
    }
    ```

---

## Adding Books to the Cart

### `function addToCart(index)`

- Adds a selected book to the cart if it's in stock.
- Decreases the book's stock quantity and updates the UI.
- Throws an error if the book is out of stock.
- Utilizes a `try-catch-finally` statement to handle errors gracefully.

#### Using Try-Catch-Finally Statements

- Try-catch-finally statements are used to handle potential errors when adding books to the cart.
- The try block attempts to add the book to the cart, and if successful, it updates the UI.
- If an error occurs (e.g., out of stock), the catch block handles the error and displays an error message to the user.
- The finally block is used for any clean-up or final actions if needed.

    ```javascript
    function addToCart(index) {
        const book = books[index];
        try {
            if (book.stockQuantity > 0) {
                cart.push(book);
                book.stockQuantity--;
                displayBooks();
                displayCart();
                alert('Success')
            } else {
                throw new Error("Sorry, this book is out of stock.");
            }
        } catch (error) {
            alert(error.message);
        } finally {
            displayBooks();
        }
    }
    ```

---

## Displaying the Cart

### `function displayCart()`

- Displays the contents of the cart on the webpage.
- Lists the titles and prices of books in the cart.
- Calculates and displays the total price of items in the cart.

    ```javascript
    function displayCart() {
        const cartContainer = document.getElementById("cart");
        cartContainer.innerHTML = "";

        let totalPrice = 0;

        cart.forEach((book) => {
            const cartItem = document.createElement("div");
            cartItem.innerHTML = `<strong>${book.title}</strong> - $${book.price}`;
            cartContainer.appendChild(cartItem);
            totalPrice += book.price;
        });

        const totalPriceElement = document.createElement("div");
        totalPriceElement.innerHTML = `<strong>Total Price: $${totalPrice.toFixed(2)}</strong>`;
        cartContainer.appendChild(totalPriceElement);
    }
    ```

---

## Checkout Process

### `function checkout()`

- Allows the user to proceed with the checkout process.
- Clears the cart after confirming the purchase.

    ```javascript
    function checkout() {
        if (cart.length === 0) {
            alert("Your cart is empty. Please add books to your cart before checking out.");
        } else {
            alert("Thank you for your purchase! Your books will be shipped to you soon.");
            cart.length = 0; // Clear the cart after checkout
            displayCart();
        }
    }
    ```

---

## Clearing the Cart

### `function clearCart()`

- Clears the cart and returns books to the shelves.
- Increases the stock quantity of each book in the cart.
- Updates the displayed book list and cart display.

    ```javascript
    function clearCart() {
        if (cart.length === 0) {
            alert("Your cart is already empty.");
        } else {
            cart.forEach((book) => {
                // Increase the stock quantity of each book in the cart
                const index = books.findIndex((storeBook) => storeBook.title === book.title);
                if (index !== -1) {
                    books[index].stockQuantity += 1;
                }
            });

            cart.length = 0; // Clear the cart
            displayBooks(); // Update the displayed book list to reflect the changes in stock quantity
            displayCart(); // Clear the cart display
            alert("Cart cleared, and books returned to the shelves.");
        }
    }
    ```

---

## Toggling Cart Visibility

### `function toggleCart()`

- Toggles the visibility of the cart when the user clicks the "View Cart" button.
- Updates the cart button text accordingly.

    ```javascript
    function toggleCart() {
        const cartContainer = document.getElementById("cart");
        cartContainer.classList.toggle("hidden");
        cartHidden = !cartHidden; // Update cartHidden variable
        const cartButton = document.getElementById("cartButton");
        cartButton.textContent = cartHidden ? 'View Cart' : 'Hide Cart';
    }
    ```

---

## Adding a Book to the Store

### `function addBookToStore()`

- Prompts the user to enter details for a new book (title, author, price, stock quantity).
- Validates the input to ensure it's valid and then creates a new `Book` object.
- Adds the new book to the store's inventory (the `books` array) and updates the UI.

#### Handling Errors with `try-catch-finally`

The `try-catch-finally` structure handles potential errors, informs the user of any issues, and keeps the UI up-to-date.

In the `addBookToStore()` function, a `try` block contains code that gathers and validates user input for adding a book to the store. If any validation fails, an error is thrown.

##### `try` Block

1. User input is collected for the book's title, author, price, and stock quantity.

2. Input is validated to ensure it's not empty, and prices and quantities are numeric and positive.

3. If input passes validation, a new `Book` object is created and added to the inventory.

##### `catch` Block

- If validation fails, an error message is shown to the user via an alert.

##### `finally` Block

- The `finally` block contains code that always runs, whether there's an error or not.

- It ensures the displayed book list is updated using `displayBooks()` to reflect any changes in the inventory.

    ```javascript
    function addBookToStore() {
        try {
            // Prompt the user for book details
            const title = prompt("Enter the book title:");
            const author = prompt("Enter the author:");
            const price = parseFloat(prompt("Enter the price:"));
            const stockQuantity = parseInt(prompt("Enter the stock quantity:"));

            // Validate the input
            if (!title || !author || isNaN(price) || isNaN(stockQuantity) || price <= 0 || stockQuantity < 0) {
                throw new Error("Invalid input. Please enter valid book details.");
            }

            // Create a new book object and add it to the store
            const newBook = new Book(title, author, price, stockQuantity);
            books.push(newBook);
            alert("Book added to the store successfully.");
        } catch (error) {
            alert(error.message);
        } finally {
            displayBooks();
        }
    }
    ```

---

## Conclusion

This JavaScript code provides the foundation for a basic online bookstore application. It allows users to interact with books, add them to a cart, check out, and even manage the store's inventory. Understanding each part of the code is essential for maintaining and extending the functionality of the application.

