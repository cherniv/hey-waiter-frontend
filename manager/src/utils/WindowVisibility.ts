
var hidden:string; 
var visibilityChange:string; 

if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof (document as any).msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof (document as any).webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

export function listenForWindowVisibility(cb:any) {
  if (typeof document.addEventListener === "undefined" || hidden === undefined) {
    console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
  } else {
    // Handle page visibility change   
    document.addEventListener(visibilityChange, () => {
      cb(!(document as any)[hidden])
    }, false);
  }

  window.addEventListener('beforeunload', function(event) {
    cb(false);
  }, false);
}