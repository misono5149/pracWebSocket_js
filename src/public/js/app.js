const messageUl = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");
const feSocket = new WebSocket(`ws://${window.location.host}`);
//back 으로 보내기위한 socket

function makeMsg(type, payload){
    const msg = {type, payload};
    return JSON.stringify(msg);
}

//닉네임 서버전송
nickForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = nickForm.querySelector("input");
    feSocket.send(makeMsg("nick", input.value));    //JSON의 string화
});

//서버실행시 이벤트
feSocket.addEventListener("open", () => {
    console.log("Connected to Server 😍");
});


//서버에서 메세지 받았을때
feSocket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageUl.append(li);
});


//서버죽었을때(껐을때)
feSocket.addEventListener("close", () => {
    console.log("Server is going offline");
});

messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    feSocket.send(makeMsg("msg", input.value));
    input.value = null;
});