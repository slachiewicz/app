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

  var favouriteForm = document.getElementById('favouriteForm');
  favouriteForm.addEventListener('submit', function (e){
    e.preventDefault();
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/favourite');
    xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.setRequestHeader('Cookie', document.cookie);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        if (xhr.responseText === '200') {
          favouriteForm.setAttribute("action", "");      
          var state = document.getElementById('starState');
          state.className = 'fa fa-star';
        }
        console.log(xhr.responseText);
        //  sendResponse({status: 200});
      }
    };

    xhr.send(JSON.stringify({id: document.getElementById('profileId').value }));
    console.log('had to favourite!!');

  })

}());
