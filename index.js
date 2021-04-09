const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const io = require("socket.io")(server, {cors: {origin:"*", methods:["GET","POST"]}});

app.use(cors());

const PORT = process.env.PORT || 8000;

app.get("/", (req,res) => {
    res.send("Server up");
});

io.on('connection', (socket) => {
    socket.emit("me", socket.id);
    socket.on("disconnect", () => {
        socket.broadcast.emit("ended");
    });
    socket.on("call", ({receiver, sigData, from, name}) => {
        io.to(receiver).emit("call",{signal:sigData, from, name});
    });
    socket.on("answer", (data) => {
        io.to(data.to).emit("answered", data.signal);
    })
});

server.listen(PORT, () =>  console.log(`Server listening on port ${PORT}`));