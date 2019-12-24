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
 let state = {
    power: 'off'
  }
  
  // Display clock
  setTime = () => {
    const time = new Date;
    document.getElementById('header_time').innerHTML = time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});;
  }

  // Update clock with current time
  setInterval(() => setTime(), 60000);

  // SET HTML elements on page
  updateDom = (selector, field, modifier, value) => {
    field !== "style" ? document.getElementById(selector)[modifier] = value : document.getElementById(selector).style[modifier] = value
  }

  // Logging of error and info messages 
  showMessage = (level, msg) => {
    if (level === "error") {
      updateDom('error_container', 'style', 'border', '4px red solid');
      document.getElementById('error_message').innerHTML = `&#9888 ${msg}`;
      setTimeout(() => {
        updateDom('error_message', null, 'innerHTML', "");
        updateDom('error_container', 'style', 'border', "");
      }, 5000);
    } else {
      updateDom('error_container', 'style', 'border', '4px green solid');
      updateDom('error_message', null, 'innerHTML', msg);
      setTimeout(() => {
        updateDom('error_message', null, 'innerHTML', "");
        updateDom('error_container', 'style', 'border', "");
      }, 5000);
    }
  }

  // Connect via HDMI
  document.getElementById('hdmi_button').addEventListener('click', async () => {
    updateDom('home', 'style', 'display', 'none');
    updateDom('hdmi_display', 'style', 'display', 'block');
    updateDom('home_button', 'style', 'display', 'block')
    updateDom('volume', 'style', 'display', 'block')
    updateDom('home_button', 'style', 'visibility', 'visible')

    const projectorOn = await axios.post('api/v1/irports/1/senddi', { "frequency": 35955, "irCode": "323,161,20,20,20,60,20,20,20,20,20,60,20,60,20,20,20,20,20,60,20,20,20,60,20,60,20,20,20,20,20,60,20,60,20,20,20,60,20,20,20,20,20,20,20,20,20,20,20,20,20,60,20,20,20,60,20,60,20,60,20,60,20,60,20,60,20,1436,322,80,20,3500", "preamble": "", "repeat": 1 })
    if (projectorOn.status !== 200) {
      showMessage("error", "Error turning on projector");
    } 

    const receiverOn = await axios.post('api/v1/irports/2/senddir', {"frequency":38186,"irCode":"342,170,22,21,22,63,22,21,22,63,22,63,22,63,22,63,22,21,22,63,22,21,22,63,22,21,22,21,22,21,22,21,22,63,22,21,22,21,22,21,22,21,22,21,22,21,22,21,22,21,22,63,22,63,22,63,22,63,22,63,22,63,22,63,22,21,22,1556,342,85,22,3647,342,85,22,3800","preamble":"","repeat":1})
    if (receiverOn.status !== 200) {
      showMessage("error", "Error turning on receiver");
    }
    showMessage('info', "Projector is on");
  })

  // Event handler for hdmi1
  document.getElementById('hdmi1').addEventListener('click', async () => {
    
  })

  // Event handler for hdmi2
  document.getElementById('hdmi2').addEventListener('click', async () => {
    
  })

  // Connect to chromecast
  document.getElementById('chromecast_button').addEventListener('click', () => {
    updateDom('home', 'style', 'display', 'none');
    updateDom('chromecast_display', 'style', 'display', 'block');
    updateDom('home_button', 'style', 'display', 'block')
    updateDom('volume', 'style', 'display', 'block')
    updateDom('home_button', 'style', 'visibility', 'visible')
  })

  // Go back home
  document.getElementById('home_button').addEventListener('click', () => {
    updateDom('chromecast_display', 'style', 'display', 'none');
    updateDom('hdmi_display', 'style', 'display', 'none');
    updateDom('home', 'style', 'display', 'flex');
    updateDom('home_button', 'style', 'visibility', 'hidden')
  })



  // Power down projector and unit
  document.getElementById('power_off').addEventListener('click', () => {
      state.power = 'off';
      updateDom('chromecast_display', 'style', 'display', 'none');
      updateDom('hdmi_display', 'style', 'display', 'none');
      updateDom('home', 'style', 'display', 'flex');
      updateDom('home_button', 'style', 'display', 'none')
      updateDom('volume', 'style', 'display', 'none')
      updateDom('power_off', 'style', 'display', 'block')
      showMessage("info", "Powering Off");
    
      // state.power = 'on'
      // updateDom('header_title', null, 'innerHTML', 'Home');
      // updateDom('chromecast_display', 'style', 'display', 'none');
      // updateDom('hdmi_display', 'style', 'display', 'none');
      // updateDom('home', 'style', 'display', 'flex');
      // updateDom('home_button', 'style', 'display', 'block')
      // updateDom('volume', 'style', 'display', 'block')
      // updateDom('power_off', 'style', 'display', 'block')
      // updateDom('power_title', null, 'innerHTML', "Power Off")
      // showMessage("info", "Powering On");
  })
});