function loadBooks() {
  fetch('/get_books')
    .then(response => response.json())
    .then(data => {
      const list = document.getElementById('book-list');
      list.innerHTML = '';
      data.forEach(book => {
        const li = document.createElement('li');
        li.innerHTML = `${book.title} by ${book.author}
          <button class="remove" onclick="removeBook('${book.title}')">Remove</button>`;
        list.appendChild(li);
      });
    });
}

function addBook() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;

  const formData = new FormData();
  formData.append('title', title);
  formData.append('author', author);

  fetch('/add_book', { method: 'POST', body: formData })
    .then(response => response.json())
    .then(result => {
      if (result.success) {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        loadBooks();
      } else {
        alert('Please fill in both fields');
      }
    });
}

function removeBook(title) {
  const formData = new FormData();
  formData.append('title', title);

  fetch('/remove_book', { method: 'POST', body: formData })
    .then(response => response.json())
    .then(result => {
      if (result.success) {
        loadBooks();
      }
    });
}

window.onload = loadBooks;
