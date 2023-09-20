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
let cartVisible = false;

function displayBooks() {
    const booksContainer = document.getElementById("books");
    booksContainer.innerHTML = "";

    books.forEach((book, index) => {
        const bookElement = document.createElement("div");
        bookElement.classList.add("book");
        bookElement.setAttribute("id", `book-${index}`);
        bookElement.innerHTML = `
            <div class="book-details hidden">
                <p>Title: ${book.title}</p>
                <p>Author: ${book.author}</p>
                <p>Price: $${book.price}</p>
                <p>Stock Quantity: ${book.stockQuantity}</p>
            </div>
            <button onclick="toggleBookDetails(${index})">View Book Details</button>
            <button onclick="handleUserAction('add', ${index})" ${book.stockQuantity === 0 ? 'disabled' : ''}>Add to Cart</button>
        `;
        booksContainer.appendChild(bookElement);
    });
}

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
        case 'toggleCart':
            toggleCart();
            break;
        default:
            alert("Invalid action.");
    }
}

function toggleBookDetails(index) {
    const bookDetails = document.querySelector(`#book-${index} .book-details`);
    const button = document.querySelector(`#book-${index} button`);
    bookDetails.classList.toggle("hidden");
    button.textContent = bookDetails.classList.contains("hidden") ? "View Book Details" : "Hide Book Details";
}

function addToCart(index) {
    const book = books[index];
    try {
        if (book.stockQuantity > 0) {
            cart.push(book);
            book.stockQuantity--;
            displayCart();
            displayBooks();
        } else {
            throw new Error("Sorry, this book is out of stock.");
        }
    } catch (error) {
        alert(error.message);
    } finally {
        // Clean up or perform final actions if needed
    }
}

function displayCart() {
    const cartContainer = document.getElementById("cart");
    cartContainer.innerHTML = "";

    let totalPrice = 0;

    cart.forEach((book) => {
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `${book.title} - $${book.price}`;
        cartContainer.appendChild(cartItem);
        totalPrice += book.price;
    });

    const totalPriceElement = document.createElement("div");
    totalPriceElement.innerHTML = `Total Price: $${totalPrice.toFixed(2)}`;
    cartContainer.appendChild(totalPriceElement);
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add books to your cart before checking out.");
    } else {
        alert("Thank you for your purchase! Your books will be shipped to you soon.");
        cart.length = 0; // Clear the cart after checkout
        displayCart();
    }
}

function toggleCart() {
    const cartContainer = document.getElementById("cart");
    cartContainer.classList.toggle("hidden");
    cartVisible = !cartVisible;
    const cartButton = document.getElementById("cartButton");
    cartButton.textContent = cartVisible ? 'Hide Cart' : 'View Cart';
}

displayBooks();
