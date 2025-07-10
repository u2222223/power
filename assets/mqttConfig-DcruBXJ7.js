function n(t,s){sessionStorage.mqttConfig=JSON.stringify({userName:t,password:s})}function o(){return sessionStorage.mqttConfig?JSON.parse(sessionStorage.mqttConfig):{}}export{o as g,n as s};
