// Define a class called Book to create book objects
class Book {
    constructor(title, author, price, stockQuantity) {
        // Constructor to initialize book properties
        this.title = title;           // Title of the book
        this.author = author;         // Author of the book
        this.price = price;           // Price of the book
        this.stockQuantity = stockQuantity; // Stock quantity of the book
    }
}

// Create an array called 'books' to store instances of Book class
const books = [
    new Book("A Tale of Two Cities", "Charles Dickens", 55.99, 108),     // Example book 1
    new Book("The Hobbit", "J. R. R. Tolkien", 120.99, 90),            // Example book 2
    new Book("The Da Vinci Code", "Dan Brown", 109.99, 50),            // Example book 3
];

// Create an empty array called 'cart' to store books added to the cart
let cart = [];

// Create a variable 'cartHidden' to track the visibility of the cart (initially hidden)
let cartHidden = true;

// Function to display books on the webpage
function displayBooks() {
    // Get the HTML element with the id 'books'
    const booksContainer = document.getElementById("books");
    
    // Clear the existing content inside the 'books' container
    booksContainer.innerHTML = "";

    // Iterate over the 'books' array and create HTML elements for each book
    books.forEach((book, index) => {
        const bookElement = document.createElement("div"); // Create a <div> for the book
        bookElement.classList.add("book"); // Add a CSS class 'book' to the <div>
        bookElement.setAttribute("id", `book-${index}`); // Set a unique id for each book <div>
        bookElement.innerHTML = `
            <div class="book-details">
                <p><strong>Title:</strong> ${book.title}</p>     <!-- Display book title -->
                <p class="author hidden"><strong>Author:</strong> ${book.author}</p>  <!-- Display book author (initially hidden) -->
                <p class="price hidden"><strong>Price:</strong> $${book.price}</p>    <!-- Display book price (initially hidden) -->
                <p class="stock hidden"><strong>Stock Quantity:</strong> ${book.stockQuantity}</p> <!-- Display stock quantity (initially hidden) -->
            </div>
            <button onclick="toggleBookDetails(${index})">View Book Details</button> <!-- Button to show/hide book details -->
            <button onclick="handleUserAction('add', ${index})" ${book.stockQuantity === 0 ? 'disabled' : ''}>Add to Cart</button> <!-- Button to add the book to the cart -->
        `;

        // Append the book <div> to the 'books' container
        booksContainer.appendChild(bookElement);
    });

    // Check if the cart should be hidden initially
    if (cartHidden) {
        const cartContainer = document.getElementById("cart");
        cartContainer.classList.add("hidden"); // Add 'hidden' class to hide the cart
    }
}

// Function to handle user actions based on the provided action type and book index
function handleUserAction(action, index) {
    switch (action) {
        case 'view':
            toggleBookDetails(index); // Toggle book details visibility
            break;
        case 'add':
            addToCart(index); // Add the selected book to the cart
            break;
        case 'checkout':
            checkout(); // Proceed to checkout (empty the cart)
            break;
        case 'clearCart':
            clearCart(); // Clear the cart (return books to the shelves)
            break;
        case 'toggleCart':
            toggleCart(); // Toggle cart visibility
            break;
        default:
            alert("Invalid action."); // Display an alert for invalid actions
    }
}

// Function to toggle the visibility of book details based on the index
function toggleBookDetails(index) {
    const bookDetails = document.querySelector(`#book-${index} .book-details`);
    const author = document.querySelector(`#book-${index} .author`);
    const price = document.querySelector(`#book-${index} .price`);
    const stock = document.querySelector(`#book-${index} .stock`);
    const button = document.querySelector(`#book-${index} button`);

    author.classList.toggle("hidden"); // Toggle author visibility
    price.classList.toggle("hidden");   // Toggle price visibility
    stock.classList.toggle("hidden");   // Toggle stock quantity visibility

    if (author.classList.contains("hidden")) {
        button.textContent = "View Book Details"; // Update button text when details are hidden
    } else {
        button.textContent = "Hide Book Details"; // Update button text when details are shown
    }
}

// Function to add a book to the cart
function addToCart(index) {
    const book = books[index]; // Get the selected book from the 'books' array
    try {
        if (book.stockQuantity > 0) {
            cart.push(book); // Add the book to the cart
            book.stockQuantity--; // Decrease the stock quantity
            displayBooks(); // Update the displayed book list
            displayCart(); // Update the cart display
            alert('Success'); // Show a success message
        } else {
            throw new Error("Sorry, this book is out of stock."); // Throw an error if the book is out of stock
        }
    } catch (error) {
        alert(error.message); // Display an error message
    } finally {
        displayBooks(); // Ensure that book display is updated
    }
}

// Function to display the cart on the webpage
function displayCart() {
    const cartContainer = document.getElementById("cart"); // Get the cart container element
    cartContainer.innerHTML = ""; // Clear the existing cart content

    let totalPrice = 0; // Initialize the total price of items in the cart

    cart.forEach((book) => {
        // Create a <div> for each book in the cart and display its title and price
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `<strong>${book.title}</strong> - $${book.price}`;
        cartContainer.appendChild(cartItem); // Append the cart item to the cart container

        totalPrice += book.price; // Add the book's price to the total price
    });

    // Create an element to display the total price of items in the cart
    const totalPriceElement = document.createElement("div");
    totalPriceElement.innerHTML = `<strong>Total Price: $${totalPrice.toFixed(2)}</strong>`;
    cartContainer.appendChild(totalPriceElement); // Append the total price element to the cart container
}

// Function to handle the checkout process
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add books to your cart before checking out.");
    } else {
        alert("Thank you for your purchase! Your books will be shipped to you soon.");
        cart.length = 0; // Clear the cart after checkout
        displayCart(); // Update the cart display
    }
}

// Function to clear the cart and return books to the shelves
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
        displayBooks(); // Update the displayed book list to reflect changes in stock quantity
        displayCart(); // Clear the cart display
        alert("Cart cleared, and books returned to the shelves.");
    }
}

// Function to toggle the visibility of the cart
function toggleCart() {
    const cartContainer = document.getElementById("cart"); // Get the cart container element
    cartContainer.classList.toggle("hidden"); // Toggle the 'hidden' class to show/hide the cart
    cartHidden = !cartHidden; // Update the cartHidden variable

    const cartButton = document.getElementById("cartButton"); // Get the cart toggle button
    cartButton.textContent = cartHidden ? 'View Cart' : 'Hide Cart'; // Update the button text
}

// Function to add a book to the store
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

        // Create a new book object and add it to the 'books' array
        const newBook = new Book(title, author, price, stockQuantity);
        books.push(newBook);
        alert("Book added to the store successfully.");
    } catch (error) {
        alert(error.message); // Display an error message if input is invalid
    } finally {
        displayBooks(); // Update the displayed book list
    }
}

// Display the initial list of books when the page loads
displayBooks();
