// custom elemtent for app register menu
class RegisterMenu extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
    this.render();
  }
  render(){
    this.shadowRoot.innerHTML = `
    <style>
    .content{
      display: grid;
      place-content: center;
      width: 75%;
      height: 600px;
      border: 1px solid black;
      margin-top: 5px;
      row-gap: 10px;
      background-color: #e7e7de;
    }
    </style>
    <div class="content">
      <p>Register</p>
      <input type="text">
      <button class="a">Register</button>
    </div>
    `;
  }
}

customElements.define("app-register-menu", RegisterMenu)