~(function(){
  var cloudf = null;
  var K = "trek", win = window, stack = [], ajax = function(url, done){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send(null);
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4)
        if(xhr.status === 200)
          done(xhr.responseText);
        else
          console.log('Error: ' + xhr.status);
    };
  }, TR = function(_){
    var N = Date.now();
    if(!localStorage.getItem(K))
      localStorage.setItem(K, N.toString(36) + "_" + Math.random().toString(36).slice(-7));
    var p = {
      as:_.as, act:_.act, m:Math.round(N / 1000),
      loc:{
        ip:cloudf.ip.split(".").map(function(a){ return parseInt(a); }),
        cntr:cloudf.loc,
      },
      who:{
        ua:cloudf.uag,
        muff:localStorage.getItem(K),
      }
    };
    ajax("https://us-central1-hey-waiter-9d976."
      + "cloudfunctions.net/trek/trek/add?info="
      + encodeURIComponent(JSON.stringify(p)), function(txt){
      console.log("trek for " + JSON.stringify(p, null, 4) + " said " + txt);
    });
  }, OBJ = win.TREK;
  if(win.trek)
    return;
  win.trek = function(p){ return stack.push(p); };
  ajax("https://www.cloudflare.com/cdn-cgi/trace", function(data){
    cloudf = ('' + data).split('\n')
      .map(function(v){ return v.split('='); })
      .map(function(a){ return ({k:a[0], v:a[1]}); })
      .filter(function(o){ return o.k; })
      .reduce(function(map, obj){
        map[obj.k] = obj.v;
        return map;
      }, {});
    // alert(JSON.stringify(cloudf));
    var tick = function(){
      if(stack.length)
        TR(stack.shift());
      setTimeout(tick, 250);
    };
    tick();
  });
  if(OBJ)
    win.trek(OBJ);
})();
//# sourceMappingURL=trek.js.map