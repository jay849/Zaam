// back-end
import http from "http";
import SocketIO from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", socket => {
    socket.onAny((event) => {
        console.log(`Socket Event: ${event}`);
      });
    socket.on("enter_room", (roomName, done) => {
        console.log(socket.id);
        console.log(socket.rooms);
        socket.join(roomName);
        console.log(socket.rooms);
        setTimeout(() => {
            done("hello from the backend");
        }, 15000);
    });
});



httpServer.listen(3000, handleListen);