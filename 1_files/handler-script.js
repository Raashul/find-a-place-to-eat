(function() {
    var xhr;
    try {
        xhr = new XMLHttpRequest();
    } catch(e) {
        // Support for older browsers IE7+, FF ...
        try {
           xhr = new ActiveXObject('Microsoft.XMLHTTP'); 
        } catch(err) {}
    }

    if (xhr) {
        xhr.open("POST", "https://handler.crew.co", true);
        xhr.withCredentials = true;
        xhr.send();
    }
})();
