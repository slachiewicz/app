(function () {

  var filterFunc = function(k) {
    return k !== '';
  }

  //highlight
  var keywords = document.getElementsByClassName('keywords')[0].value;
  if (keywords.length > 0) {
    var checkHighlight = document.getElementsByClassName('check-highlight');
    var regex = keywords.split(' ').filter(filterFunc).join('|');
    regex = regex.replace(/[-[\]{}()*+?.,\\^$]/g, "\\$&");
    var matcher = new RegExp(regex, 'gi');

    var options = {
      startTag :"<b class='highlight'>", // could be a hyperlink
      endTag   :"</b>" // or you could use <i> instead of <b> ... want it? ask!
    }

    function wrapper (match) {
      return options.startTag + match + options.endTag;
    }

    for(var i = 0; i < checkHighlight.length; i++) {
      checkHighlight[i].innerHTML = checkHighlight[i].textContent.replace(matcher, wrapper);
    }

  }

}());
