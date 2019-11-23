// Awaits for DOM to load before executing javascript
function ready(callbackFunc) {
    if (document.readyState !== 'loading') {
      // Document is already ready, call the callback directly
      callbackFunc();
    } else if (document.addEventListener) {
      // All modern browsers to register DOMContentLoaded
      document.addEventListener('DOMContentLoaded', callbackFunc);
    } else {
      // Old IE browsers
      document.attachEvent('onreadystatechange', function() {
        if (document.readyState === 'complete') {
          callbackFunc();
        }
      });
    }
  }
  

  ready(function() {

    document.getElementById('connect-hdmi').addEventListener('click', () => {
     axios.get('https://jsonplaceholder.typicode.com/todos/1')
     .then( (res) => {
         console.log("Get files: ", res)
     })
   })
  });