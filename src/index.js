class Book {
    constructor(title, author, price, stockQuantity) {
        this.title = title;
        this.author = author;
        this.price = price;
        this.stockQuantity = stockQuantity;
    }
}

const books = [
    new Book("Book 1", "Author 1", 15.99, 10),
    new Book("Book 2", "Author 2", 12.99, 5),
    new Book("Book 3", "Author 3", 9.99, 8),
];

const cart = [];
let cartHidden = true; // Variable to track cart visibility

// Function to display books
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

    // Check if the cart should be hidden initially
    if (cartHidden) {
        const cartContainer = document.getElementById("cart");
        cartContainer.classList.add("hidden");
    }
}

// Function to handle user actions
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

// Function to toggle book details visibility
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

// Function to add a book to the cart
function addToCart(index) {
    const book = books[index];
    try {
        if (book.stockQuantity > 0) {
            cart.push(book);
            book.stockQuantity--;
            displayBooks();
            displayCart();
        } else {
            throw new Error("Sorry, this book is out of stock.");
        }
    } catch (error) {
        alert(error.message);
    } finally {
        // Clean up or perform final actions if needed
    }
}


// Function to display the cart
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

// Function to handle the checkout process
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add books to your cart before checking out.");
    } else {
        alert("Thank you for your purchase! Your books will be shipped to you soon.");
        cart.length = 0; // Clear the cart after checkout
        displayCart();
    }
}

// Function to clear the cart
function clearCart() {
    cart.length = 0; // Clear the cart
    displayCart();
}

// Function to toggle the cart visibility
function toggleCart() {
    const cartContainer = document.getElementById("cart");
    cartContainer.classList.toggle("hidden");
    cartHidden = !cartHidden; // Update cartHidden variable
    const cartButton = document.getElementById("cartButton");
    cartButton.textContent = cartHidden ? 'View Cart' : 'Hide Cart';
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

        // Create a new book object and add it to the store
        const newBook = new Book(title, author, price, stockQuantity);
        books.push(newBook);
        displayBooks();
        alert("Book added to the store successfully.");
    } catch (error) {
        alert(error.message);
    } finally {
        // Clean up or perform final actions if needed
    }
}

// Add an event listener for the "Add Book" button
const addBookButton = document.getElementById("addBookButton");
addBookButton.addEventListener("click", addBookToStore);

// Display initial books
displayBooks();
