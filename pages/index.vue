<template>
  <div class="principal">
    <div class="nav">
      <!-- <div class="brand"><img src="logo.png" alt="" class="img-fluid"></div> -->
      <div class="connected">
        <p class="netflix-text">{{ connected }}</p>
      </div>
    </div>
    <div class="content">
      <div v-if="player" class="player">
        <a class="control-btn" @click="play">
          <i data-feather="play"></i>
          <i data-feather="pause"></i>
        </a>
        <a class="control-btn" @click="next">
          <i data-feather="skip-forward"></i>
        </a>
        <a class="control-btn" @click="fullscreen">
          <i data-feather="maximize"></i>
        </a>
      </div>
      <div v-if="!player" class="shows">
        <div class="show" v-for="(show, index) in netflix.shows" :key="index">
          <img class="img-fluid" :src="show.img" alt="" @click="open(show.path)">
        </div>
      </div>
      <a v-show="connected === 'connected' && netflix.shows.length <= 0" class="btn btn-netflix" @click="sendRead">List Movies/Shows</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      netflix: {
        // shows: [ { "path": "/watch/80025172?tctx=1%2C39%2C%2C%2C", "img": "https://occ-0-1966-1123.1.nflxso.net/art/c2961/d38bab3a1ce2403ec73471228613b2b85bcc2961.jpg", "name": "Narcos" }, { "path": "/watch/70242311?tctx=1%2C0%2C%2C%2C", "img": "https://occ-0-1966-1123.1.nflxso.net/art/3182d/0ce89ce8e2649b63f649bc53f7b373aebee3182d.jpg", "name": "Orange Is the New Black" }, { "path": "/watch/80174479?tctx=1%2C1%2C%2C%2C", "img": "https://occ-0-1966-1123.1.nflxso.net/art/f0aa0/8eb323b378365cb3172774a645030165aa5f0aa0.jpg", "name": "Final Space" }, { "path": "/watch/80236421?tctx=1%2C2%2C%2C%2C", "img": "https://occ-0-1966-1123.1.nflxso.net/art/29815/6abcb75e55605bd019b939945226e05124329815.jpg", "name": "Extinção" }, { "path": "/watch/80175350?tctx=1%2C3%2C%2C%2C", "img": "https://occ-0-1966-1123.1.nflxso.net/art/515a0/17573371236a4b8b1084457ff080283a476515a0.jpg", "name": "SWORDGAI The Animation" }, { "path": "/watch/80002537?tctx=1%2C4%2C%2C%2C", "img": "https://occ-0-1966-1123.1.nflxso.net/art/0c5a1/287c41b9c721cd2e3aa93609a2140fb56310c5a1.jpg", "name": "Marvel - Luke Cage" }, { "path": "/watch/80167481?tctx=1%2C5%2C%2C%2C", "img": "https://occ-0-1966-1123.1.nflxso.net/art/b7fca/e78768baebf6676761901a9613be21a3171b7fca.jpg", "name": "Próxima Parada: Apocalipse" }, { "path": "/watch/80174897?tctx=1%2C6%2C%2C%2C", "img": "https://occ-0-1966-1123.1.nflxso.net/art/72804/d462d9e25d3b7bf17067b9025c4857acf0e72804.jpg", "name": "Tal Pai, Tal Filha" }, { "path": "/watch/80109194?tctx=1%2C7%2C%2C%2C", "img": "https://occ-0-1966-1123.1.nflxso.net/art/6cc70/7e62a0c0a099df76ab03b12b36118efceb96cc70.jpg", "name": "O Atirador" }, { "path": "/watch/80192098?tctx=1%2C8%2C%2C%2C", "img": "https://occ-0-1966-1123.1.nflxso.net/art/802f1/a9dc89c0d2b7af3d96ed0162d0d7c3191e1802f1.jpg", "name": "La casa de papel" }, { "path": "/watch/80097140?tctx=1%2C9%2C%2C%2C", "img": "https://occ-0-1966-1123.1.nflxso.net/art/a5040/f40c08d3dae91413030236ce62fe9a526f3a5040.jpg", "name": "Altered Carbon" }, { "path": "/watch/70242081?tctx=2%2C39%2C%2C%2C", "img": "https://occ-0-1966-1123.1.nflxso.net/art/71710/47894f72fda88c5bc01e87e77fc3f8929fe71710.webp", "name": "Arrow" }, { "path": "/watch/80230018?tctx=2%2C0%2C%2C%2C", "img": "https://occ-0-1966-1123.1.nflxso.net/art/a7707/aa047f4fe599970e5867cb940c2f13ba174a7707.jpg", "name": "Switched" }, { "path": "/watch/80037476?tctx=2%2C1%2C%2C%2C", "img": "https://occ-0-1966-1123.1.nflxso.net/art/f2124/5ab9985d054ef2ddf98c5b0514da8d32320f2124.webp", "name": "Pixels" }, { "path": "/watch/70272479?tctx=2%2C2%2C%2C%2C", "img": "https://occ-0-1966-1123.1.nflxso.net/art/8f4a1/806a3e22fde7c5cc37149a3fb1f8a42b0f88f4a1.webp", "name": "Bates Motel" }, { "path": "/watch/80093133?tctx=2%2C3%2C%2C%2C", "img": "https://occ-0-1966-1123.1.nflxso.net/art/dd75f/e5e39bb9c13642ae6ad9876b33cf94eaae1dd75f.webp", "name": "Warcraft - O Primeiro Encontro de Dois Mundos" }, { "path": "/watch/70219484?tctx=2%2C4%2C%2C%2C", "img": "https://occ-0-1966-1123.1.nflxso.net/art/59aed/56e62208600598c2059a9f585832ffbb8fb59aed.webp", "name": "Teen Wolf" }, { "path": "/watch/80118036?tctx=2%2C5%2C%2C%2C", "img": "https://occ-0-1966-1123.1.nflxso.net/art/24025/9487b29350671daf446b8ff5074b77ce76724025.webp", "name": "Liga dos Deuses" }, { "path": "/watch/70242311?tctx=2%2C6%2C%2C%2C", "img": "https://occ-0-1966-1123.1.nflxso.net/art/3182d/0ce89ce8e2649b63f649bc53f7b373aebee3182d.jpg", "name": "Orange Is the New Black" }, { "path": "/watch/80236421?tctx=2%2C7%2C%2C%2C", "img": "https://occ-0-1966-1123.1.nflxso.net/art/29815/6abcb75e55605bd019b939945226e05124329815.jpg", "name": "Extinção" }, { "path": "/watch/80174479?tctx=2%2C8%2C%2C%2C", "img": "https://occ-0-1966-1123.1.nflxso.net/art/f0aa0/8eb323b378365cb3172774a645030165aa5f0aa0.jpg", "name": "Final Space" }, { "path": "/watch/80167481?tctx=2%2C9%2C%2C%2C", "img": "https://occ-0-1966-1123.1.nflxso.net/art/b7fca/e78768baebf6676761901a9613be21a3171b7fca.jpg", "name": "Próxima Parada: Apocalipse" }]
        shows: []
      },
      player: true,
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
    alert(this.$route.query.url)
    $(function() {
      feather.replace();
    });
  }
};
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Nunito:400,700');

.principal {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.principal .nav {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  /* margin-bottom: auto; */
  padding: 10px;
}
.principal .nav .brand {
  margin-right: auto;
  width: 20%;
}

.principal .content {
  margin-top: auto;
  margin-bottom: auto;
}

.principal .shows {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  height: 50vh;
}
.principal .shows > .show {
  width: 80px;
  height: auto;
  margin: 10px;
}

.principal .player {
  display: flex;
  justify-content: center;
  align-items: center;
}
.principal .player > a {
  margin: 10px;
}

.principal .player .feather {
  stroke: #fff;
}
</style>
