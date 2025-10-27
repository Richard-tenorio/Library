function loadBooks() {
  fetch('/get_books')
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('book-list');
      list.innerHTML = '';
      data.forEach(book => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${book.title} by ${book.author} — Copies: ${book.copies}
          ${window.location.pathname.includes('admin') ?
            `<button class='remove' onclick="removeBook('${book.title}')">Remove</button>` :
            `<button onclick="borrowBook('${book.title}')">Borrow</button>
             <button onclick="returnBook('${book.title}')">Return</button>`
          }
        `;
        list.appendChild(li);
      });
    });
}

function addBook() {
  const formData = new FormData();
  formData.append('title', document.getElementById('title').value);
  formData.append('author', document.getElementById('author').value);
  formData.append('copies', document.getElementById('copies').value);

  fetch('/add_book', { method: 'POST', body: formData })
    .then(r => r.json()).then(res => {
      if (res.success) loadBooks();
    });
}

function removeBook(title) {
  const fd = new FormData();
  fd.append('title', title);
  fetch('/remove_book', { method: 'POST', body: fd })
    .then(r => r.json()).then(res => {
      if (res.success) loadBooks();
    });
}

function borrowBook(title) {
  const fd = new FormData();
  fd.append('title', title);
  fetch('/borrow_book', { method: 'POST', body: fd })
    .then(r => r.json()).then(res => {
      if (res.success) loadBooks();
      else alert('No copies left!');
    });
}

function returnBook(title) {
  const fd = new FormData();
  fd.append('title', title);
  fetch('/return_book', { method: 'POST', body: fd })
    .then(r => r.json()).then(res => {
      if (res.success) loadBooks();
    });
}

window.onload = loadBooks;
