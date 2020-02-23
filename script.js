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
    power: 'off',
    currentVolume: 50,
    previousVolume: 0,
    requestedVolume: 0
  }
  
  // Display clock
  setTime = () => {
    const time = new Date;
    document.getElementById('header_time').innerHTML = time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});;
  };

  // Update clock with current time
  setInterval(() => setTime(), 60000);

  // SET HTML elements on page
  updateDom = (selector, field, modifier, value) => {
    field !== "style" ? document.getElementById(selector)[modifier] = value : document.getElementById(selector).style[modifier] = value
  };
  
  // Remove toast after 5 seconds
  removeToastElements = (toastType) => {
    if (toastType === 'error') {
      setTimeout(() => {
        updateDom('error_container', 'style', 'display', 'none');
        updateDom('error_message', null, 'innerHTML', "");
        updateDom('exclamation_mark', 'style', 'display', 'none')
        updateDom('error_container', 'style', 'border', "");
      }, 5000);
    } else {
      setTimeout(() => {
        updateDom('error_container', 'style', 'display', 'none');
        updateDom('check_mark', 'style', 'display', 'none');
        updateDom('error_message', null, 'innerHTML', "");
        updateDom('error_container', 'style', 'border', "");
      }, 5000);
    }
  };

  // Prevent any timeout overlap
  clearToast = (toast) => {
    clearTimeout(toast)
  };

  // Logging of error and info messages 
  showMessage = (level, msg) => {
    if (level === "error") {
      clearToast(removeToastElements)
      updateDom('error_container', 'style', 'display', 'block');
      updateDom('error_container', 'style', 'background-color', '#e2bab7')
      updateDom('error_container', 'style', 'border', '1px solid #d69692')
      updateDom('exclamation_mark', 'style', 'display', 'inline')
      updateDom('error_message', null, 'innerText', msg);
      removeToastElements(level)
    } else {
      clearToast(removeToastElements)
      updateDom('error_container', 'style', 'display', 'block');
      updateDom('check_mark', 'style', 'display', 'inline')
      updateDom('error_container', 'style', 'background-color', '#bcdcea')
      updateDom('error_container', 'style', 'border', '1px solid #82b3d8')
      updateDom('error_message', null, 'innerText', msg);
      removeToastElements(level)
    }
  }

  // Connect via HDMI
  document.getElementById('hdmi_button').addEventListener('click', async () => {
    updateDom('home', 'style', 'display', 'none');
    updateDom('hdmi_display', 'style', 'display', 'block');
    updateDom('home_button', 'style', 'display', 'block')
    updateDom('volume', 'style', 'display', 'block')
    updateDom('home_button', 'style', 'visibility', 'visible')
    updateDom('power_off', 'style', 'display', 'block')
    const projectorOn = await axios.post('api/v1/irports/1/senddir', { "frequency": 35955, "irCode": "323,161,20,20,20,60,20,20,20,20,20,60,20,60,20,20,20,20,20,60,20,20,20,60,20,60,20,20,20,20,20,60,20,60,20,20,20,60,20,20,20,20,20,20,20,20,20,20,20,20,20,60,20,20,20,60,20,60,20,60,20,60,20,60,20,60,20,1436,322,80,20,3500", "preamble": "", "repeat": 1 })
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
    const hdmi1On = await axios.post('api/v1/irports/2/senddir', {"frequency":38186,"irCode":"342,170,22,21,22,63,22,21,22,63,22,63,22,63,22,63,22,21,22,63,22,21,22,63,22,21,22,21,22,21,22,21,22,63,22,63,22,63,22,63,22,21,22,21,22,21,22,63,22,21,22,21,22,21,22,21,22,63,22,63,22,63,22,21,22,21,22,1983,1,3800","preamble":"","repeat":1})
    if (hdmi1On.status !== 200) {
      showMessage("error", "Error turning on receiver");
    }
  })

  // Event handler for hdmi2
  document.getElementById('hdmi2').addEventListener('click', async () => {
    const hdmi2On = await axios.post('api/v1/irports/2/senddir', {"frequency":38186,"irCode":"342,170,22,21,22,63,22,21,22,63,22,63,22,63,22,63,22,21,22,63,22,21,22,63,22,21,22,21,22,21,22,21,22,63,22,21,22,63,22,21,22,63,22,21,22,21,22,63,22,21,22,63,22,21,22,63,22,21,22,63,22,63,22,21,22,21,22,1556,342,85,22,3800","preamble":"","repeat":1})
    if (hdmi2On.status !== 200) {
      showMessage("error", "Error turning on receiver");
    }
  })
  
  // Volume slider event listener
  document.getElementById("volume_slider").oninput = function() {
    updateVolume()
  };

  // POST volume values 
  const updateVolume = async () => {
    state.requestedVolume = document.getElementById("volume_slider").value //gets the oninput value
    const volumeInterval = ((state.requestedVolume - state.currentVolume) / 10)
    if (volumeInterval < 0) {
      // Firing down volume
      const volumeDownCall = await axios.post('api/v1/irports/2/senddir', {"frequency":38186,"irCode":"342,170,22,21,22,63,22,21,22,63,22,63,22,63,22,63,22,21,22,63,22,21,22,63,22,21,22,21,22,21,22,21,22,63,22,63,22,63,22,21,22,63,22,63,22,21,22,21,22,21,22,21,22,21,22,63,22,21,22,21,22,63,22,63,22,63,22,1514,342,85,22,3800","preamble":"","repeat": Math.abs(volumeInterval)})
    if (volumeDownCall.status !== 200) {
      showMessage("error", "Error decreasing volume");
    }
    } else {
      const volumeUpCall = await axios.post('api/v1/irports/2/senddir', {"frequency":38186,"irCode":"342,170,22,21,22,63,22,21,22,63,22,63,22,63,22,63,22,21,22,63,22,21,22,63,22,21,22,21,22,21,22,21,22,63,22,21,22,63,22,21,22,63,22,63,22,21,22,21,22,21,22,63,22,21,22,63,22,21,22,21,22,63,22,63,22,63,22,1514,342,85,22,3800","preamble":"","repeat": volumeInterval})
      if (volumeUpCall.status !== 200) {
        showMessage("error", "Error increasing volume");
      }
    }
  }

  // Connect to chromecast
  document.getElementById('chromecast_button').addEventListener('click', async () => {
    const projectorOn = await axios.post('api/v1/irports/1/senddir', { "frequency": 35955, "irCode": "323,161,20,20,20,60,20,20,20,20,20,60,20,60,20,20,20,20,20,60,20,20,20,60,20,60,20,20,20,20,20,60,20,60,20,20,20,60,20,20,20,20,20,20,20,20,20,20,20,20,20,60,20,20,20,60,20,60,20,60,20,60,20,60,20,60,20,1436,322,80,20,3500", "preamble": "", "repeat": 1 })
    if (projectorOn.status !== 200) {
      showMessage("error", "Error turning on projector");
    } 

    const hdm13On = await axios.post('api/v1/irports/1/senddir', {"frequency":38186,"irCode":"342,170,22,21,22,63,22,21,22,63,22,63,22,63,22,63,22,21,22,63,22,21,22,63,22,21,22,21,22,21,22,21,22,63,22,63,22,21,22,63,22,63,22,21,22,21,22,63,22,21,22,21,22,63,22,21,22,21,22,63,22,63,22,21,22,21,22,1556,342,85,22,3800","preamble":"","repeat":1})
    if (hdm13On.status !== 200) {
      showMessage("error", "Error turning on receiver");
    } 

    updateDom('home', 'style', 'display', 'none');
    updateDom('chromecast_display', 'style', 'display', 'block');
    updateDom('home_button', 'style', 'display', 'block')
    updateDom('volume', 'style', 'display', 'block')
    updateDom('home_button', 'style', 'visibility', 'visible')
    updateDom('power_off', 'style', 'display', 'block')
  })

  // Go back home
  document.getElementById('home_button').addEventListener('click', () => {
    updateDom('chromecast_display', 'style', 'display', 'none');
    updateDom('hdmi_display', 'style', 'display', 'none');
    updateDom('home', 'style', 'display', 'flex');
    updateDom('home_button', 'style', 'visibility', 'hidden')
  })

  // Power off projector and receiver
  document.getElementById('power_off').addEventListener('click', async () => {
    const projectorOff = await axios.post('api/v1/irports/1/senddir', {"frequency":35955,"irCode":"322,161,20,20,20,60,20,20,20,20,20,60,18,9651465,1,147,1,60,20,20,20,20,20,60,20,20,20,60,20,60,20,20,20,20,20,60,20,60,20,20,20,60,20,60,20,60,20,20,20,60,20,20,20,20,20,60,20,20,20,20,20,20,20,60,20,20,20,60,20,60,20,1435,322,80,20,3438,322,80,20,3500","preamble":"","repeat":2})
    if (projectorOff.status !== 200) {
      showMessage("error", "Error turning off projector");
    } 
    const receiverOff = await axios.post('api/v1/irports/2/senddir', {"frequency":38186,"irCode":"343,170,22,21,22,63,22,63,22,63,22,63,22,63,22,63,22,21,22,63,22,21,22,21,22,21,22,21,22,21,22,21,22,63,22,21,22,63,22,21,22,63,22,21,22,63,22,21,22,21,22,63,22,21,22,63,22,21,22,63,22,21,22,63,22,63,22,1514,342,85,22,3647,342,85,22,3800","preamble":"","repeat":1})
    if (receiverOff.status !== 200) {
      showMessage("error", "Error turning off receiver");
    }

    updateDom('chromecast_display', 'style', 'display', 'none');
    updateDom('hdmi_display', 'style', 'display', 'none');
    updateDom('home', 'style', 'display', 'flex');
    updateDom('home_button', 'style', 'display', 'none')
    updateDom('volume', 'style', 'display', 'none')
    updateDom('power_off', 'style', 'display', 'none')
    showMessage("info", "Powering off");    
  })
});