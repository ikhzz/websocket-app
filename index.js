const express = require("express"),
  socket = require("socket.io"),
  sqlite = require("sqlite3"),
// open database in progress
  db = new sqlite.Database("./user.db", (err, res)=> {
    if(err){
      console.log(err)
    }
    if(res){
      console.log(res)
    }
  }),
  // database table setup
  dbSetup = `CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    socketid TEXT(30), 
    name TEXT(30), 
    status TEXT(10))`,
  // database query for all data
  dbAlldata = `SELECT * FROM users`,
  PORT = process.env.Port || 4000;
// run database setup
db.run(dbSetup, err => {
  (err != null)? console.log(err) : console.log("Database setup success")
});

const app = express();
// set express to listen 
const server = app.listen(PORT , ()=> {
  console.log("server is listening")
});
// set middle ware
app.use(express.static("public"));
// connect socket to express server
const io = socket(server);
io.on("connection", socket => {
  // too much log
  console.log(socket.id)
  // listen login user
  // bad practice should use promise, speed run mode
  socket.on("login", data => {
    db.get(`SELECT * FROM users WHERE name='${data}'`, (err, query)=> {
      (err != null)? console.log(err) : console.log(`Get login user`)
      const editUser = `UPDATE users SET socketid='${socket.id}', status='online' WHERE id='${query.id}'`,
        oldId = query.socketid;
      db.run(editUser, err => {
        (err != null)? console.log(err) : console.log(`Set login user: ${data} success`)
        db.all(dbAlldata, (err, send) => {
          // send all user data back to client and new id to other client
          (err != null)? console.log(err) : console.log(`Sending all data`)
          socket.emit("userLogin", send)
          socket.broadcast.emit("newId", [socket.id, oldId])
        })
      })
    })
  })
  // listen register user
  // bad practice should use promise, speed run mode
  socket.on("register", data => {
    const userSetup = `INSERT INTO users 
      (socketid, name, status) 
      VALUES
      ('${socket.id}', '${data}', 'online')`;
      // insert new user with the name and socket id
    db.run(userSetup, err => {
      (err != null)? console.log(err) : console.log(`Register user: ${data} success`)
      db.all(dbAlldata, (err, send) => {
        // send all user data back to all client
        (err != null)? console.log(err) : console.log(`Sending new user all data`)
        socket.emit("newUser", send)
        socket.broadcast.emit("newUser", send)
      })
    })
  })
  // listen check request
  // bad practice should use promise, speed run mode
  socket.on("requestCheck", data => {
    db.get(`SELECT * FROM users WHERE name='${data}'`, (err, query)=> {
      (err != null)? console.log(err) : console.log(`Return check response`)
      if(query ===  undefined){
        socket.emit("resCheck", true)
      } else {
        socket.emit("resCheck", false)
      }
    })
  })
  // listen to login request
  // bad practice should use promise, speed run mode
  socket.on("requestLogin", res => {
    const allOnlineUser = `SELECT * FROM users WHERE status='offline'`
    db.all(allOnlineUser, (err, query) => {
      (err != null)? console.log(err) : console.log(`Return login data response`)
      socket.emit("resReq", query)
    })
  })
  // listen to messages
  socket.on("incoming", res => {
    // if id is null message send to all client
    if(res.id == "null"){
      socket.broadcast.emit("outgoing", {"dest": null, "msg": res.msg, "user": res.user})
    } else {
      // if id is not null send message to the id 
      socket.broadcast.to(res.id).emit("outgoing", {"dest": socket.id, "msg": res.msg, "user": res.user})
      // too much log
      console.log(`from: ${socket.id},to: ${res.id}, msg: ${res.msg}, user: ${res.user}`)
    }
    
  })
  // listen to disconnect user
  // bad practice should use promise, speed run mode
  socket.on("disconnect", ()=> {
    // query user with the disconnected socket id
    const userOffline = `SELECT * FROM users WHERE socketid='${socket.id}'`
    db.get(userOffline, (err, query) => {
      (err != null)? console.log(err) : console.log(`Request offline user success`)
      if(query !== undefined){
        const editOffline = `UPDATE users SET status='offline' WHERE id='${query.id}'`;
        // update user status
        db.run(editOffline, err=> {
          (err != null)? console.log(err) : console.log(`Update offline user success`)
          const offlineUser = `SELECT * FROM users WHERE id='${query.id}'`;
          db.get(offlineUser, (err,res) => {
            (err != null)? console.log(err) : console.log(`Return offline user response`)
            // notify all client about logoff user
            socket.broadcast.emit("logoff", res)
          })
        })
      }
    })
  })
})