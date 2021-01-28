// import necessary component
import "./app-header.js";
import "./app-content.js"
import "./app-registerMenu.js";
import "./app-loginMenu.js";
import {Chats} from "../chat.js"
// set chats class and connection state
const socket = new Chats;
let isConnected = false;
// custom element parent root and and setup
class AppMain extends HTMLElement{
  constructor(){
    super()
    this.attachShadow({mode: "open"})
    this.render()
  };
  // method to switch chat page
  loggedIn(){
    const content = document.createElement("app-content");
    this.shadowRoot.replaceChild(content, this.shadowRoot.lastChild);
  };
  // method to switch register menu page
  registerPage(){
    const register = document.createElement("app-register-menu");
    this.shadowRoot.replaceChild(register, this.shadowRoot.lastChild);
  }
  // method to switch login menu page
  loginPage(){
    const menu = document.createElement("app-login-menu");
    this.shadowRoot.replaceChild(menu, this.shadowRoot.lastChild);
  };
  // method to set username
  setUsername(name){
    this.shadowRoot.querySelector("app-content")
      .shadowRoot.querySelector(".userContent")
      .setAttribute("data-user", name)
  }
  // method to add user
  addUserlist(users){
    const list = this.shadowRoot.querySelector("app-content")
      .shadowRoot.querySelector(".userList"),
      userMap = `
    ${users.map(user => `
    <li>
        <div class="${user.status}"></div>
        <p data-id="${user.id}">${user.name}</p>
      </li>
    `).join('')}`;

    list.innerHTML += userMap;
    this.setChatroom(users)
  }
  // set chat room
  setChatroom(users){
    const list = this.shadowRoot.querySelector("app-content")
    .shadowRoot.querySelector(".messageContent"),
    userMap = `
      ${users.map(user => `
      <ul data-id="${user.id}" data-user="${user.name}">
        <li>
          <p>Room : ${user.name}</p>
        </li>
      <li class="message">

      </li>
      <li class="messageInput" >
        <textarea></textarea>
        <button>Send</button>
      </li>
    </ul>
      `).join('')}`;
    list.innerHTML += userMap;
    this.listenSwitch()
    this.setListensend()
  }
  // method to switch room
  listenSwitch(){
    const list = this.shadowRoot.querySelector("app-content")
        .shadowRoot.querySelectorAll(".userList li"),
      roomList = this.shadowRoot.querySelector("app-content")
        .shadowRoot.querySelectorAll(".messageContent ul"),
      general = this.shadowRoot.querySelector("app-content")
        .shadowRoot.querySelector(".userContent li:first-child"),  
      arrayList = Array.from(list)
      
    arrayList.unshift(general)
    arrayList.forEach((e,i) => {
      e.addEventListener("click", ()=> {
        roomList.forEach(e => {
          if(e.classList == "active"){
            e.classList.remove("active")
          }
        })
        roomList[i].classList = "active"
      })
    })
  }
  // 
  setGeneralmessage(msg){
    const message = this.shadowRoot.querySelector("app-content")
      .shadowRoot.querySelector(".message");
    const p = document.createElement('p')
    p.innerHTML = `${msg}
    `;
    message.appendChild(p)
  }
  setPersonalchat(msg){
    const message = this.shadowRoot.querySelector("app-content")
      .shadowRoot.querySelector(`.messageContent [data-id='${msg.dest}'] .message`);
      const away = document.createElement('away')
      //console.log(message)
    away.innerHTML = `${msg.user}: ${msg.msg}`
    message.appendChild(away)
  }
  setSendchat(id, msg){
    const message = this.shadowRoot.querySelector("app-content")
      .shadowRoot.querySelector(`.messageContent [data-id='${id}'] .message`);
      const home = document.createElement('home')
      //console.log(message)
    home.innerHTML = `You: ${msg}`
    message.appendChild(home)
  }
  setListensend(){
    const send = this.shadowRoot.querySelector("app-content")
        .shadowRoot.querySelectorAll(".messageInput button"),
      input = this.shadowRoot.querySelector("app-content")
        .shadowRoot.querySelectorAll(".messageInput textarea"),
      node = this.shadowRoot.querySelector("app-content")
        .shadowRoot.querySelectorAll(".messageContent > ul"),
      userName = this.shadowRoot.querySelector("app-content")
        .shadowRoot.querySelector(".userContent")
        .getAttribute("data-user")

    send.forEach((e,i) => {
      e.addEventListener("click", ()=> {
        if(input[i].value.length > 0){
          const id = node[i].getAttribute("data-id")
          this.setSendchat(id, input[i].value)
          console.log(userName)
          socket.sendMessage("personal", {"id": id, "msg": input[i].value, "user": userName})
          input[i].value = ""
        }
      })
    })
  }
  // method to set new id
  setNewid(id){
    let dataid = this.shadowRoot.querySelector("app-content")
      .shadowRoot.querySelector(`.messageContent [data-id='${id[1]}']`);
    dataid.setAttribute("data-id", id[0])
  }
  // method set listener to register page
  setListener(){
    const register = this.shadowRoot.querySelector("app-register-menu").shadowRoot.querySelector('.a');
    const input = this.shadowRoot.querySelector("app-register-menu").shadowRoot.querySelector('input')
    register.addEventListener("click", ()=> {
      if(input.value.length > 0){
        socket.getUser(input.value)
      }
    })
  }
  // method to disconnect socket connection
  disconnect(){
    socket.disconnect();
    isConnected = false;
  }
  // method to render element
  render(){
    this.shadowRoot.innerHTML = `
    <style>
      app-header{
        display: grid;
        justify-items: center;
      }
      app-content{
        display: grid;
        justify-items: center;
      }
      app-login-menu{
        display: grid;
        justify-items: center;
      }
      app-register-menu{
        display: grid;
        justify-items: center;
      }
    </style>
    `;
    const header = document.createElement("app-header"),
      menu = document.createElement("app-register-menu");
    const testcontent = document.createElement("app-content")
    this.shadowRoot.appendChild(header)
    this.shadowRoot.appendChild(menu)
  }
  testing(){
    socket.getUser("ikhz")
  }
}

customElements.define("app-main", AppMain);
export {isConnected};