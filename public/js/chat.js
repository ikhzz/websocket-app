// get all method from custom element
const appMain = document.querySelector("app-main");

class Chats {
  // initial property 
  _socket;
  _currentUser = [];

  // create connection
  connect = () => this._socket = io.connect("http://localhost:4000");
  // disconnect connection
  disconnect = () => this._socket.disconnect();
  // method to send message
  sendMessage = (dest, msg) => this._socket.emit(dest, msg);
  // was listener to general message
  listenMessage = () =>{
    this._socket.on("loginNotif", res => {
      appMain.setGeneralmessage(res)
    })
  }
  // listen to user setting
  listenUser = () => {
    // listen to user
    this._socket.on("newUser", res => {
      // filter the current user
      const fil = res.filter(rlt => rlt.id != this._socket.id)
      // if the user only 1 set the data
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
    this._socket.on("login", res => {
      // filter the current user
      const fil = res.filter(rlt => rlt.id != this._socket.id)
      // save the data and set it
      this._currentUser = fil
      appMain.addUserlist(fil)
    })
    // set the edited data 
    this._socket.on("newId", res => {
      appMain.setNewid(res)
    })
  }
  // supposedly to listen if user has registered or not and many more
  getUser = (name) => {
    this.connect();
    appMain.loggedIn()
    this.sendMessage("user", name)
    this.listenUser()
    this.listenChat()
    appMain.setUsername(name)
  }
  // method to set listener for chat message
  listenChat = () => {
    this._socket.on("perMsg", res => {
      console.log(res)
      appMain.setPersonalchat(res)
    })
  }
  // method to compare new or edited user
  compareObject = (objOne) => {
    let result = []
    if(this._currentUser.length <= 0){
      result = objOne
    } else {
      this._currentUser.forEach(e => {
        const index = objOne.findIndex((res => res.name != e.name)) 
        console.log(index)
        if(index != -1){
          result.push(objOne[index])
        }
      })
    }
    this._currentUser = objOne
    return result;
  }
}

export {Chats}