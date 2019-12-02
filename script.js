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
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState === 'complete') {
        callbackFunc();
      }
    });
  }
}


ready(function () {

  document.getElementById('connect-hdmi').addEventListener('click', async () => {
  const projectorOn = await axios.post('api/v1/irports/1/senddi', { "frequency": 35955, "irCode": "323,161,20,20,20,60,20,20,20,20,20,60,20,60,20,20,20,20,20,60,20,20,20,60,20,60,20,20,20,20,20,60,20,60,20,20,20,60,20,20,20,20,20,20,20,20,20,20,20,20,20,60,20,20,20,60,20,60,20,60,20,60,20,60,20,60,20,1436,322,80,20,3500", "preamble": "", "repeat": 1 })
  console.log("Projector status ", projectorOn.status)
  if (projectorOn.status !== 200) {
    alert("Error turning on projector")
  } 
     const receiverOn = await axios.post('api/v1/irports/2/senddir', {"frequency":38186,"irCode":"342,170,22,21,22,63,22,21,22,63,22,63,22,63,22,63,22,21,22,63,22,21,22,63,22,21,22,21,22,21,22,21,22,63,22,21,22,21,22,21,22,21,22,21,22,21,22,21,22,21,22,63,22,63,22,63,22,63,22,63,22,63,22,63,22,21,22,1556,342,85,22,3647,342,85,22,3800","preamble":"","repeat":1})
    receiverOn.status !== 200
    console.log("Receiver on", receiverOn)
  })
});