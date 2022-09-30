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

      bookImage.addEventListener('dblclick', function (event) {
        event.preventDefault();

        let elemId = event.target.offsetParent.getAttribute('data-id');

        if (
          !favoriteBooks.includes(elemId) && event.target.offsetParent.classList.contains('book__image')
        ) {
          console.log(favoriteBooks[elemId]);
          console.log(event);
          event.target.offsetParent.classList.add('favorite');

          favoriteBooks.push(elemId);
          console.log(favoriteBooks);
        } else if (
          favoriteBooks.includes(elemId) && event.target.offsetParent.classList.contains('book__image')
        ) {
          event.target.offsetParent.classList.remove('favorite');
          const indexOf = favoriteBooks.indexOf(event.target.offsetParent);
          favoriteBooks.splice(indexOf, 1);
        }
      });
    }

    const filters = [];
    const filtersContainer = document.querySelector('.filters');
  
    filtersContainer.addEventListener('click', function (event) {
      if (
        event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'
      ) {
        if (event.target.checked == true) {
          filters.push(event.target.value);
        } else if (event.target.checked == false) {
          const indexOf = filters.indexOf(event.target.value);
          filters.splice(indexOf, 1);
        }
        console.log(filters);
        filterBooks();
      }
    });

    function filterBooks() {
      for (let book in dataSource.books){

        let shouldBeHidden = false;
        const bookId = dataSource.books[book].id;

        for (const filter of filters){

          if (!dataSource.books[book].details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }

        const imageElement = document.querySelector(`[data-id="${bookId}"]`);

        if (shouldBeHidden == true){
          imageElement.classList.add('hidden');
        } else {
          imageElement.classList.remove('hidden');
        }
      }}
  }

  renderBooks();
  initActions();
}