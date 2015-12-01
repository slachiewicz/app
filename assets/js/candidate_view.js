(function () {
  //favourite
  var favouriteForm = document.getElementsByClassName('favourite-form')[0];
    favouriteForm.addEventListener('submit', function (e){
      e.preventDefault();
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/favourite');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          if (xhr.responseText === '200') {
            favouriteForm.setAttribute("action", "");
            var state = document.getElementById('star-state');
            state.className = 'fa fa-star';
          }
          console.log(xhr.responseText);
        }
      };

      xhr.send(JSON.stringify({id: document.getElementById('profileId').value }));
      console.log('had to favourite!!');

    }, false);

    //delete duplicate profile
    var deleteProfile = document.getElementsByClassName('delete-profile')[0];
    var deleteProfileConfirmation = document.getElementsByClassName('delete-profile-confirmation')[0];
    var cancelDeleteProfile = document.getElementsByClassName('cancel-delete-profile')[0];

    deleteProfile.addEventListener('click', function (e){
      e.preventDefault();
      deleteProfileConfirmation.style.display = 'block'
      deleteProfile.style.display = 'none';
    }, false);

    cancelDeleteProfile.addEventListener('click', function() {
      deleteProfileConfirmation.style.display = 'none';
      deleteProfile.style.display = 'block';
    }, false);



})();
