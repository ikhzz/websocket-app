// import the necessary component
import "./component/app-main.js"
import "./component/app-content.js"
import {isConnected} from "./chat.js"
// set the necessary variable
const appMain =  document.querySelector("app-main"),
  appHeader = appMain.shadowRoot.querySelector("app-header"),
  login = appHeader.shadowRoot.querySelector(".login"),
  register = appHeader.shadowRoot.querySelector(".register");

// set the initial listener
if(appMain.shadowRoot.querySelector("app-register-menu").shadowRoot.querySelector(".a")){
  appMain.listenerRegpage();
}
// listener to switch login page and set the listener for login
login.addEventListener("click", ()=> {
  appMain.loginPage();
  if(isConnected == true) appMain.disconnect()
})
// listener to switch register page and set the listener for register
register.addEventListener("click", ()=> {
  appMain.registerPage();
  if(isConnected == true) appMain.disconnect()
})

//appMain.testing()