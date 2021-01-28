const moment = require("moment"),
  express = require("express"),
  socket = require("socket.io"),
  sqlite = require("sqlite3"),
// open database in progress
  db = new sqlite.Database("./user.db", (err)=> {
    if(err){
      console.log(err)
    }
  });

//db.run("CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT(30), status TEXT(10), message BLOB()");

const PORT = process.env.Port || 4000;

const app = express();
// set express to listen 
const server = app.listen(PORT , ()=> {
  console.log("server is listening")
});
// set middle ware
app.use(express.static("public"));
// connect socket to express server
const io = socket(server);
// save all account in memory/array for development purposes
let socketUser = []
io.on("connection", socket => {
  // too much log
  console.log(socket.id)
  // listen register user
  socket.on("user", data => {
    // check the data 
    const result = checkUser(data, socket.id)
    // if result is a new data
    if(result[0] == "newUser"){
      // send data back to all client
      socket.emit(result[0], result[1])
      socket.broadcast.emit(result[0], result[1])
    } else {
      // if resutl is not a new data
      // send the edited data back to the client
      socket.emit(result[0], result[1])
      // send the edited data to other client as new id
      socket.broadcast.emit("newId", result[2])
    }
  })
  // listen to messages
  socket.on("personal", res => {
    // if id is null message send to all client
    if(res.id == "null"){
      socket.broadcast.emit("perMsg", {"dest": null, "msg": res.msg, "user": res.user})
    } else {
      // if id is not null send message to the id 
      socket.broadcast.to(res.id).emit("perMsg", {"dest": socket.id, "msg": res.msg, "user": res.user})
      // too much log
      console.log(`from: ${socket.id},to: ${res.id}, msg: ${res.msg}, user: ${res.user}`)
    }
    
  })
  // listen to disconnect user
  socket.on("disconnect", ()=> {
    // check user that offline
    const offlineUser = setOffline(socket.id)
    // send the user data
    socket.broadcast.emit("logoff", offlineUser)
  })
})
// function to set the data to offline
const setOffline = (id) => {
  const index = socketUser.findIndex((obj => obj.id == id))
  socketUser[index].status = "offline"
  return socketUser[index]
}
// function to add or edit data
const checkUser = (name, id) => {
  const index = socketUser.findIndex((obj => obj.name == name))
  if(index == -1){
    const user = {"id": id, "name": name, "status": "online"} 
    socketUser.push(user)
    return ["newUser" ,socketUser]
  } else {
    const oldId = socketUser[index].id
    socketUser[index].id = id
    socketUser[index].status = "online"
    return ["login" ,socketUser, [socketUser[index].id, oldId]]
  }
}