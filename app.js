//모듈에 변수 저장
var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');

//웹 서버 생성
var server = http.createServer(function (request, response) {
    //HTMLPage.html 읽기
    fs.readFile('HTMLPage.html', function (error, data) {
        response.writeHead(200, { 'Content-type': 'text/html'});
        response.end(data);
    });
}).listen(52273, function () {
    console.log('Server Running at http://127.0.0.1:52273');
});

//소켓 서버
var io = socketio.listen(server);
io.sockets.on('connection', function (socket) {
    //메시지 이벤트
    socket.on('message', function (data) {
        //클라이언트의 message 이벤트를 발생시킴
        io.sockets.emit('message', data);
    });
});