# BookBuddy

Deployment link: https://fastidious-kitsune-e6f1c5.netlify.app/

BookBuddy is a web-based application designed to simulate a library management system where users can browse, check out, and return books. The application allows users to register for an account, view all available books, and manage their checked-out books. The goal of this project is to create a functional and user-friendly interface using React, along with handling user authentication and managing state effectively.

## Features

- **Books Catalog:** View a list of all books in the library.
- **Book Details:** View detailed information about a specific book.
- **User Authentication:** Register and log in to your account to manage checked-out books.
- **User Account:** View your personal account information, including your checked-out books.
- **Book Checkout/Return:** Authenticated users can check out and return books from the catalog.
- **Search and Filter:** Filter books by title or author using a text matcher.

## Routes

- **/books:** Displays all books in the library's catalog.
- **/books/:id:** Displays details of an individual book.
- **/login:** Allows users to log in to their account.
- **/register:** Allows users to create an account.
- **/account:** Displays user-specific account information, including the username/email and a list of checked-out books.

### Functionality

- **Unauthenticated Users:**
  - Can view a list of all books.
  - Can sign up for an account and log in.
  - Cannot check out or return books.
  - Cannot view other users' account information.

- **Authenticated Users:**
  - Can check out and return books.
  - Can view their own account page and see currently checked-out books.
  - Cannot view or modify other users' accounts.

### Implementation

#### JavaScript Basics
- Correct use of `let` and `const` for variable declarations.
- Loops (`map`, `forEach`, `for`, or `while`) for iteration.
- Control structures (`if`, `else`, `else if`, ternaries) for conditional logic.
- Functions (declaration and invocation) to handle business logic.
- Use of complex data types (arrays and objects) to store and manipulate data.

#### Front-End Basics
- Functional React components for rendering UI.
- Proper use of props to share data and functions between components.
- Usage of event listeners for handling user interactions.
- State management with hooks (`useState`, `useEffect`).
- Routing using React Router (`useNavigate`, `useParams`) to enable SPA navigation.

#### CSS Basics
- Layouts using Flexbox/Grid for responsive design.
- Avoiding CSS conflicts by adhering to cascading and specificity rules.
- A clean and intuitive user interface (UI) for a seamless user experience (UX).

## Setup Instructions

1. Clone this repository:

    ```bash
    git clone https://github.com/deniseosoria/BookBuddy.git
    ```

2. Navigate to the project directory:

    ```bash
    cd BookBuddy
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Run the development server:

    ```bash
    npm start
    ```

5. Visit `http://localhost:3000` to view the app in action.
