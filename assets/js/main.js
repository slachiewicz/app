(function () {

  var current = document.getElementById('currentPage').value;
  var total = document.getElementById('totalPages').value;


  function newSearch(currentSearch, search) {
    if (currentSearch !== search) {
      document.getElementById('currentPage').value = 1;
    }

  }


  document.getElementById('prev').addEventListener('click', function () {
    
    console.log('cicked');
    
    if (current > 1) {
      document.getElementById('currentPage').value = Number(current) - 1;
    }
    newSearch(document.getElementById('query').value, document.getElementById('searchInput').value );
    document.getElementById('search-form').submit();
  
  }, false);

  document.getElementById('next').addEventListener('click', function () {
    
    console.log('cicked fghher');

    if (current < total) {
      console.log('inside');
      document.getElementById('currentPage').value = Number(current) + 1;
    }
    newSearch(document.getElementById('query').value, document.getElementById('searchInput').value );
    document.getElementById('search-form').submit();

  }, false);


  document.getElementById('search-form').addEventListener('submit', function () { 
    console.log('sooooooo');
   newSearch(document.getElementById('query').value, document.getElementById('searchInput').value );
  }, false);

}());