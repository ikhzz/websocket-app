// import the necessary component
import "./component/app-main.js"
import "./component/app-content.js"
// set the necesarry variable
const appMain =  document.querySelector("app-main"),
  appHeader = appMain.shadowRoot.querySelector("app-header"),
  login = appHeader.shadowRoot.querySelector(".login"),
  register = appHeader.shadowRoot.querySelector(".register");

// set the initial listener
if(appMain.shadowRoot.querySelector("app-register-menu").shadowRoot.querySelector(".a")){
  appMain.setListener();
}
// listener to switch login page and set the listener for login
login.addEventListener("click", ()=> {
  appMain.loginPage();
})
// listener to switch register page and set the listener for register
register.addEventListener("click", ()=> {
  appMain.registerPage();
  appMain.setListener();
})

//appMain.testing()