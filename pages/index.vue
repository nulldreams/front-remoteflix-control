<template>
  <div class="principal container">
    <h1>{{ connected }}</h1>
    <div v-show="player" class="player">
      <input type="button" value="Play" @click="play">
      <input type="button" value="Next" @click="next">
      <input type="button" value="Full Screen" @click="fullscreen">
    </div>
    <div v-show="!player" class="shows">
      <div class="show" v-for="(show, index) in netflix.shows" :key="index">
        <img class="img-fluid" :src="show.img" alt="" @click="open(show.path)">
      </div>
    </div>
    <input type="button" value="AAAA" @click="sendRead">
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      netflix: {
        shows: []
      },
      player: false,
      connected: 'disconnected',
      commands: {
        play_resume: "parar/continuar",
        next: "next",
        back: "back",
        fullscreen: "fullscreen",
        refresh: 'refresh-info',
        read: 'read',
        open: 'open'
      },
      video: undefined
    };
  },
  sockets: {
    connect: function() {
      console.log("Vue socket connected");
    },
    stream: function(msg) {
      if (msg === 'connected') return this.connected = msg
    },
    video_info: function(info) {
      this.video = info;
      console.log(info);
    },
    'all-shows': function (_shows) {
      this.netflix.shows = _shows
    }
  },
  methods: {
    sendRead: function() {
      this.$socket.emit("stream", this.commands.read);
    },
    open: function(index) {
      this.$socket.emit("stream", `${this.commands.open}:${index}`)
      this.player = true
    },
    play: function() {
      this.$socket.emit("stream", this.commands.play_resume)
    },
    next: function() {
      this.$socket.emit("stream", this.commands.next)
    },
    fullscreen: function() {
      this.$socket.emit("stream", this.commands.fullscreen)
    }
  },
  created() {
    $(function() {
      feather.replace();
    });
  }
};
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Nunito:400,700');

.principal .shows {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.principal .shows > .show {
  width: 250px;
  height: auto;
  margin: 10px;
}

.principal .player {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
