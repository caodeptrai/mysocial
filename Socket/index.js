import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUsers = [];

const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username,socketId });

    console.log("onlineeeeeeeee1213",onlineUsers)
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  console.log("abc",onlineUsers)
  console.log("ussername",username)
  const re = onlineUsers.filter((user) => user.username.displayName === username);
  console.log("re",re)
  return re;
};

io.on("connection", (socket) => {
    
  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);
  });

  socket.on("sendNotification", ({ senderName, receiverName, type }) => {

    const receiver = getUser(receiverName);
    console.log("fgf",receiver[0].socketId)
    io.to(receiver).emit("getNotification", {
      senderName,
     receiverName,
      type,
    });
    const data = {senderName,receiverName,type}
    console.log("dataa",data)
  });

  socket.on("hello", (arg) => {
    console.log(arg); // world
  });

//   socket.on("sendText", ({ senderName, receiverName, text }) => {
//     const receiver = getUser(receiverName);
//     io.to(receiver.socketId).emit("getText", {
//       senderName,
//       text,
//     });
//   });


  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

io.listen(5000);

