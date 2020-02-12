+function(){
  $(document).ready(function(){
    function bake(name, value, days){
      var expires;
      if(days){
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
      } else {
        expires = "";
      }
      var res = name + "=" + value + expires + "; path=/";
      document.cookie = res;
    }

    function eat(c_name){
      if(document.cookie.length > 0){
        var c_start = document.cookie.indexOf(c_name + "="), c_end = 0;
        if(c_start !== -1){
          c_start = c_start + c_name.length + 1;
          c_end = document.cookie.indexOf(";", c_start);
          if(c_end === -1){
            c_end = document.cookie.length;
          }
          return unescape(document.cookie.substring(c_start, c_end));
        }
      }
      return "";
    }

    var NM = "wlfcookie";
    if(eat(NM) !== NM){
      var o = $("#cookiebar");
      o.show();
      o.html("We use cookies. <button onclick='letcookiesbe()' style='border-radius: .4em; border: 1px solid #070;margin: .3em;'>I'm fine with it</button>");
      window.letcookiesbe = function(){
        bake(NM, NM, 30);
        o.hide();
      }
    }
  });
}();