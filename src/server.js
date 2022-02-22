import express from "express";
import http from "http";
import WebSocket from "ws";

// websocket이라는  protocol을 사용  -> npm i ws (node에서는 독보적인 websocket implementation - core)

const app = express();  

//서버환경설정
app.set('view engine', 'pug');                                  //view엔진으로 pug사용할것이다.
app.set("views", __dirname + "/views");                         //view는 /views에 있다.
app.use("/public", express.static(__dirname + "/public"));      //public 밑에서 정적파일들을 사용할것이다.


//라우터처리
app.get("/", (req, res) => res.render("home"));                 //home.pug
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log("listening on http://localhost:3000");

const server = http.createServer(app); //access http server
const wss = new WebSocket.Server({ server }); //webSocket server

const sockets = [];         //접속자들

//connect webSocket server
wss.on("connection", (socket) => {
    console.log("Connected to Broswer! ✅");
    sockets.push(socket);
    console.log(sockets);
    socket.on("close", () => {
        console.log("DisConnected by Broswer!!! ❌")
    });     //브라우저에서 닫았을때
    socket.on("message", (message) => { //  FE에서 받은 메세지를 다시 FE에게 보내준다.
        console.log(message.toString());
        sockets.forEach((aSocket) => {
            aSocket.send(message.toString());
        });
    });

});

server.listen(3000, handleListen);