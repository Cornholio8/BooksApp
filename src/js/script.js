{
  'use strict';

  const select = {
    templateOf: {
      books: '#template-book',
    },

    containerOf: {
      books: '.books-list',
    },
  };

  const templates = {
    books: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  };


  function renderBooks (){
    for(let book of dataSource.books){
      const generatedHTML = templates.books(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      const menuContainer = document.querySelector(select.containerOf.books);
      menuContainer.appendChild(generatedDOM);

    }
  }

  const favoriteBooks = [];

  function initActions(){
    const bookImages = document.querySelectorAll('.book__image');

    for (let bookImage of bookImages){
      const bookId = bookImage.getAttribute('data-id');

      bookImage.addEventListener('dblclick', function (event) {
        event.preventDefault();
        favoriteBooks.push(bookId);
        bookImage.classList.add('favorite');
      });
    }


  }

  renderBooks();
  initActions();
}