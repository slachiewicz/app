(function () {

  function search() {
    var searchInput = document.getElementById('search-box').value;
    var currentPage = document.getElementById('currentPage').value;
    var totalPages = document.getElementById('totalPages').value;
    var filter = 'all';

    if (searchInput === '') {
      window.location.href = '/';
    } else {
      var queryString = encodeURIComponent(searchInput);

      window.location.href='/search/' + filter + '/' + queryString + '/' + 1;
    }
  }

 document.getElementById('search-btn').addEventListener('click', function (e) {
    e.preventDefault();
    search();
  }, false);

  document.getElementById('search-box').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
      search();
    }
  }, false);

  var favouriteBtn = document.getElementById('favourite');
  favouriteBtn.addEventListener('click', function (){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/favourite');
    xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.setRequestHeader('Cookie', document.cookie);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText);
        //  sendResponse({status: 200});
      }
    };
    xhr.send(JSON.stringify({id: '123'}));
    console.log('had to favourite!!');

  })

}());
