// custom element for login page
class LoginMenu extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
    this.render();
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
      word-wrap: break-word;
    }
    .content{
      display: grid;
      justify-content: center;
      grid-template-rows: repeat(auto-fill, minmax(40px, auto));
      overflow-y: scroll;
      width: 75%;
      height: 600px;
      border: 1px solid black;
      margin-top: 5px;
      row-gap: 10px;
      background-color: #e7e7de;
    }
    .content li {
      border: 1px solid black;
      background-color: white;
      padding: 4px 8px;
      max-width: 270px;
      border-radius: 5px;
    }
    </style>
    <ul class="content">
    <p>User list :</p>
    </ul>
    `;
  }
}

customElements.define("app-login-menu", LoginMenu)