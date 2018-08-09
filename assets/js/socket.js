// connect: function (teste) {
//     console.log(teste);
//     console.log("Vue socket connected");
//   },
//   stream: function (msg) {
//     if (msg === "connected") return (this.connected = msg);
//   },
//   video_info: function (info) {
//     this.video = info;
//     console.log(info);
//   },
//   "all-shows": function (_shows) {
//     this.netflix.shows = _shows;
//   }
exports.connect = (server) => {
  console.log(server)
  const socket = io(server);
  console.log(socket)
  socket.on("connect", () => {
    console.log("conectado");
  })

  return socket
}
