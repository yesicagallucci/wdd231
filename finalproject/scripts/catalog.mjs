//funcion de busqueda
export async function fetchBooks(query, maxResults = 20) {
    const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=${maxResults}`
    );
    const data = await response.json();
    return data.items || []
}

//funcion para renderizar
export function renderCatalog(books) {
    const container = document.getElementById("catalogContainer");
    container.innerHTML = "";

    books.forEach(book => {
        const info = book.volumeInfo;
        const thumbnail = info.imageLinks ? info.imageLinks.thumbnail : "";
        const categories = info.categories ? info.categories.join(", ") : "No category";
        const previewLink = info.previewLink || "#";

        const item = document.createElement("div");
        item.className = "book-item";
        item.innerHTML = `
            <div class="book-card">
                ${thumbnail ? `<img src="${thumbnail}" alt="Cover of ${info.title}">` : ""}
                <div class="book-info">
                    <strong>${info.title || "No title"}</strong><br>
                    ${info.authors ? info.authors.join(", ") : "Unknown author"}
                    <em>${categories}</em><br>
                    <a href="${previewLink}" target="_blank" rel="noopener noreferrer">Learn More</a>
                </div>
            </div>
       `;
       container.appendChild(item);
    });
}


