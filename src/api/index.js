const API_URL = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books`;

export async function getBooks() {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();
    return result.books;

  } catch (err) {
    return []; // Return an empty array on error
  }
}

export async function getSingleBook(id) {
  if (!id) {
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(
        `Error fetching book with ID ${id}: ${response.statusText}`
      );
    }

    const result = await response.json();
    return result.book;

  } catch (err) {
    return null; // Return null on error
  }
}

export async function getLogin(formData) {
  try {
    const response = await fetch(
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      if (result.name === "IncorrectCredentialsErrorr") {
        throw new Error("Username or password is incorrect");
      }
      throw new Error(result.message || "Login failed.");
    }

    return result; // Expected { token, message }
  } catch (err) {
    return { error: err.message }; // Ensure the frontend receives an error
  }
}

export async function getRegister(formData) {
  try {
    const response = await fetch(
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          password: formData.password,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      if (result.name === "UserExistsError") {
        throw new Error("Account already exists. Please log in.");
      }
      throw new Error(result.message || "Registration failed.");
    }

    return result; // Expected { token, message }
  } catch (err) {
    return { error: err.message }; // Ensure the frontend receives an error
  }
}

export async function getAuthentication(token) {
  try {
    const response = await fetch(
      `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.statusText}`);
    }

    const result = await response.json();

    return result;
  } catch (err) {
    return { error: err.message };
  }
}

export async function getReservedBooks(token) {
  try {
    const response = await fetch(
      `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();
    return result.reservation;
  } catch (err) {
    return []; // Return an empty array on error
  }
}

export async function reserveBook(token, bookId) {
  try {
    const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Pass the token for authentication
      },
      body: JSON.stringify({available: false }), //the desired new available status for the book
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to reserve book.");
    }
    return result;
  } catch (err) {
    return { error: err.message };
  }
}

export async function returnBook(token, bookId) {
  try {
    const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Pass the token for authentication
      },
      body: JSON.stringify({available: true }), //the desired new available status for the book
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to return book.");
    }

    return result;
  } catch (err) {
    return { error: err.message };
  }
}
