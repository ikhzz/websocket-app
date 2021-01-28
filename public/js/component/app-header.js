// custom element for app header
class AppHeader extends HTMLElement {
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
  };

  login(){

  }
  connectedCallback(){
    this.render();
  };

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
    app-header{
      display: grid;
      justify-items: center;
    }
    .header{
      display: grid;
      grid-template-columns: auto auto;
      column-gap: 10px;
      border: 1px solid black;
      width: 75%;
      height: fit-content;
      background-color: #0f3057;
    }
    .header li {
      display: grid;
      padding: 10px 10px;
      grid-template-columns: minmax(50px, auto) auto;
      align-items: center;
    }
    .header li:first-child{
      display: grid;
      grid-template-columns: 60px auto;
      color: white;
    }
    .header li:last-child{
      display: grid;
      column-gap: 10px;
      justify-items: center;
      justify-content: end;
    }
    .header img{
      width: 50px;
      height: 50px;
      border-radius: 10px;
    }
    button{
      background-color: #008891;
      border: 1px solid #008891;
      padding: 2px 8px;
      border-radius: 4px;
      box-shadow: 0px 0px 1px 2px #008891;
      margin-right: 10px;
    }
    button:hover{
      background-color: #4dd4db;
    }
    @media screen and (max-width: 702px){
      .header{
        width: 90%
      }
    }
    </style>
    <ul slot="header" class="header">
      <li>
        <img src="\assets/img/IMG_0109.JPG" alt="">
        <h3>iChat</h3>
      </li>
      <li>
        <button class="register">register</button>
        <button class="login">login</button>
      </li>
    </ul>
    `;
  }
}

customElements.define("app-header", AppHeader);