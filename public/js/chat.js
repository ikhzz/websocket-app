// get all method from custom element
const appMain = document.querySelector("app-main");
let isConnected = false;

class Chats {
  // initial property 
  _socket;
  _currentUser = [];

  // create connection
  connect = () => this._socket = io.connect("http://localhost:4000");
  // disconnect connection
  disconnect = () => {
    this._socket.disconnect();
    isConnected = false
  }
  // method to send message
  ioEmit = (dest, msg) => this._socket.emit(dest, msg);
  // listen to user setting
  listenUser = () => {
    // listen to user
    this._socket.on("newUser", res => {
      // filter the current user
      const fil = res.filter(rlt => rlt.socketid != this._socket.id)
      // if the user only 1 set the data
      console.log(fil)
      if(fil.length == 1){
        appMain.addUserlist(fil)
        this._currentUser = fil  
      }
      // if user is more than one
      if(fil.length > 1){
        // filter the unset user and set it
        const result = this.compareObject(fil)
        appMain.addUserlist(result)
      }
    })
    // listen to login
    this._socket.on("userLogin", res => {
      // filter the current user
      const fil = res.filter(rlt => rlt.socketid != this._socket.id)
      // save the data and set it
      this._currentUser = fil
      appMain.addUserlist(fil)
    })
    // listen and set the edited data
    this._socket.on("newId", res => {
      appMain.setNewid(res)
    })
    // listen and set offline user
    this._socket.on("logoff", res=> {
      appMain.setOffline(res)
    })
  }
  // method to login or register user
  setUser = (type, name) => {
    this.connect();
    appMain.loggedIn()
    this.ioEmit(type, name)
    this.listenUser()
    this.listenChat()
    appMain.setUsername(name)
    isConnected = true
  }
  // method to check registered user
  checkUser = (name) => {
    this.connect();
    this.ioEmit("requestCheck", name)
    this._socket.on("resCheck", res=> {
      this._socket.disconnect()
      if(res === true){
        this.setUser("register", name)
        this._currentUser = []
      } else {
        // set shitty snackbar
      }
    })
  }
  // method to set listener for chat message
  listenChat = () => {
    this._socket.on("outgoing", res => {
      appMain.outgoingMessage(res)
    })
  }
  // method to get all user for login menu 
  getAllUser = () => {
    this.connect()
    this.ioEmit("requestLogin", "request all user")
    this._socket.on("resReq", res => {
      if(res.length > 0) appMain.setLoginUser(res)
      this._socket.disconnect()
    })
  }
  // method to compare new or edited user
  compareObject = (objOne) => {
    let result = objOne
    if(this._currentUser.length <= 0){
      result = objOne
    } else {
      this._currentUser.forEach(e => {
        // nah filter is the better one
        result = result.filter(res => res.name != e.name)
      })
    }
    this._currentUser = objOne
    return result;
  }
}

export {Chats, isConnected}