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
exports.connect = (server, cb) => {
  const socket = io(server);
  socket.on("connect", () => {
    console.log('connected')
    return cb(null, { socket, connected: true })
  })   
}

exports.all_genres = (socket, cb) => {
  console.log(socket)
  socket.emit('stream', 'all-genres')

  socket.on('all-genres', (genres) => {
    console.log(genres)
    return cb(null, genres)
  })    
}
