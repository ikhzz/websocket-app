// custom element for chatting menu
class AppContent extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode: "open"})
  }
  connectedCallback(){
    this.render()
  }
  render(){
    this.shadowRoot.innerHTML = `
    <style>
      * {
        list-style-type: none;
        margin: 0;
        padding: 0;
        text-decoration: none;
        font-family: 'Andika New Basic', 'Arial', 'sans-serif';
      }
      .content{
        display: grid;
        grid-template-columns: 1fr 2fr;
        width: 75%;
        height: 600px;
        margin-top: 5px;
        column-gap: 2px;
      }
      .content > li{

      }
      .userContent{
        display: grid;
        grid-template-rows: 50px auto;
        row-gap: 5px;
        height: 100%;
        border: 2px solid black;
      }
      .userContent > li{
        background-color: #0f3057;
        color: white;
      }
      .userContent > li:first-child{
        display: grid;
        place-items: center;
      }
      .userContent button{
        font-size: 20px;
        padding: 0px 30px;
        background-color: #008891;
        border: 1px solid #008891;
        border-radius: 5px;
      }
      .userContent button:hover{
        background-color: #4dd4db;
      }
      .userList{
        margin: 0px 10px;
        border: 1px solid black;
        height: 490px;
        overflow-y: scroll;
      }
      .userList li *{
        display: inline-block;
      }
      .userList li div{
        margin-left: 10px;
      }
      .userList li p{
        margin-left: 5px;
      }
      .userList li{
        background-color: #008891;
        color: black;
      }
      .userList li:not(last-child){
        margin-bottom: 10px;
      }
      .userList li:hover{
        background-color: #4dd4db;
      }
      .userList div{
        width: 12px;
        height: 12px;
        background-color: red;
        border-radius: 50%;
        border: 2px solid white;
      }
      .userList div.online{
        background-color: blue
      }
      .messageContent li{
        background-color: #008891;
      }
      .messageContent li:first-child{
        padding-left: 10px;
      }
      .messageContent li:nth-child(2){
        background-color: #e7e7de;
      }
      .messageInput{
        display: grid;
        grid-template-columns: auto 60px;
        column-gap: 5px;
      }
      textarea{
        resize: none;
      }
      button{
        margin: 5px 1px;
        border-radius: 5px;
        background-color: #008891;
        border: 1px solid black;
        margin-right: 2px;
      }
      button:hover{
        background-color: #4dd4db;
      }
      .messageContent > ul{
        position: absolute;
        width: 100%;
        border: 1px solid black;
        display: grid;
        grid-template-rows: 30px auto 50px;
        height: 100%;
      }
      .messageContent{
        position: relative;
      }
      .messageContent ul.active{
        z-index: 1;
      }
      .message{
        overflow-y: scroll;
        display: grid;
        grid-template-rows: repeat(auto-fill, minmax(30px, auto));
        row-gap: 4px;
        padding-top: 5px;
      }
      .message home,
      .message away{
        border: 1px solid black;
        border-radius: 5px;
        padding: 2px 4px;
        height: fit-content;
      }
      .message home{
        justify-self: start;
        margin-right: 10px;
        background-color: white;
        margin-left: 2px;
      }
      .message away{
        justify-self: end;
        margin-right: 10px;
        margin-left: 10px;
        background-color: lightblue;
      }
      @media screen and (max-width: 702px){
        .content{
          width: 90%
        }
        
      }
    </style>
    <ul class="content">
      <li>
        <ul class="userContent">
          <li>
            <div></div>
            <button>General</button>
          </li>
          <li>
            <h2>Users :</h2>
            <ul class="userList"></ul>
          </li>
        </ul>
      </li>
      <li class="messageContent">
        <ul class="active" data-id="null">
          <li>
            <p>Room: General</p>
          </li>
          <li class="message"></li>
          <li class="messageInput">
            <textarea></textarea>
            <button>Send</button>
          </li>
        </ul>
      </li>
    </ul>
    `;
  }
};

customElements.define("app-content", AppContent);