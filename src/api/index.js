const BASE_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

const jsonHeaders = {
  "Content-Type": "application/json",
};

// GET all books
export async function getBooks() {
  console.log("✅ fetchBooksFromAPI called");
  try {
    const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books");
    const result = await response.json();
    console.log("🧪 Full result object:", result);

    return result;
  } catch (err) {
    console.error("fetchBooksFromAPI error:", err);
    return [];
  }
}



// GET single book by ID
export async function getSingleBook(id) {
  console.log("getSingleBook called with id:", id);
  if (!id) return null;

  try {
    const response = await fetch(`${BASE_URL}/books/${id}`);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch book");
    }
    console.log("getSingleBook result:", result);
    return result;
  } catch (err) {
    console.error("getSingleBook error:", err);
    return null;
  }
}

// POST login
export async function getLogin({ email, password }) {
  console.log("getLogin called with:", { email });
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    console.log("getLogin result:", result);

    if (!response.ok) {
      throw new Error(result.message || "Login failed");
    }

    return result; // { token, message }
  } catch (err) {
    console.error("getLogin error:", err);
    return { error: err.message };
  }
}

// POST register
export async function getRegister({ firstname, lastname, email, password }) {
  console.log("getRegister called with:", { firstname, lastname, email });
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify({ firstname, lastname, email, password }),
    });

    const result = await response.json();
    console.log("getRegister result:", result);

    if (!response.ok) {
      throw new Error(result.message || "Registration failed");
    }

    return result;
  } catch (err) {
    console.error("getRegister error:", err);
    return { error: err.message };
  }
}

// GET authenticated user info
export async function getAuthentication(token) {
  console.log("getAuthentication called");
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        ...jsonHeaders,
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    console.log("getAuthentication result:", result);

    if (!response.ok) {
      throw new Error(result.message || "Authentication failed");
    }

    return result;
  } catch (err) {
    console.error("getAuthentication error:", err);
    return { error: err.message };
  }
}

// GET reserved books
export async function getReservedBooks(token) {
  console.log("getReservedBooks called");
  try {
    const response = await fetch(`${BASE_URL}/reservations`, {
      method: "GET",
      headers: {
        ...jsonHeaders,
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    console.log("getReservedBooks result:", result);
    return result;
  } catch (err) {
    console.error("getReservedBooks error:", err);
    return [];
  }
}

// POST reserve a book
export async function reserveBook(token, bookId) {
  console.log("reserveBook called with bookId:", bookId);
  try {
    const response = await fetch(`${BASE_URL}/reservations`, {
      method: "POST",
      headers: {
        ...jsonHeaders,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bookId }),
    });

    const result = await response.json();
    console.log("reserveBook result:", result);

    if (!response.ok) {
      throw new Error(result.message || "Failed to reserve book.");
    }

    return result;
  } catch (err) {
    console.error("reserveBook error:", err);
    return { error: err.message };
  }
}

// DELETE return a book (by reservationId)
export async function returnBook(token, reservationId) {
  console.log("returnBook called with reservationId:", reservationId);
  try {
    const response = await fetch(`${BASE_URL}/reservations/${reservationId}`, {
      method: "DELETE",
      headers: {
        ...jsonHeaders,
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    console.log("returnBook result:", result);

    if (!response.ok) {
      throw new Error(result.message || "Failed to return book.");
    }

    return result;
  } catch (err) {
    console.error("returnBook error:", err);
    return { error: err.message };
  }
}
