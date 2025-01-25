const API_URL = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books`;



export async function getBooks() {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();

    console.log("Fetch all books: ", result.books);
    return result.books;
  } catch (err) {
    console.error("Error fetching books:", err);
    return []; // Return an empty array on error
  }
}

export async function getSingleBook(id) {
    if (!id) {
      console.error("No book ID provided for getSingleBook.");
      return null;
    }
  
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) {
        throw new Error(`Error fetching book with ID ${id}: ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log("Fetch single book: ", result.book);
      return result.book;
    } catch (err) {
      console.error("Error fetching book:", err);
      return null; // Return null on error
    }
  }
  

// export async function handleDelete(bookId) {
//   try {
//     const response = await fetch(`${API_URL}/${bookId}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (err) {
//     console.error(`Error removing book #${bookId}:`, err);
//   }
// }



