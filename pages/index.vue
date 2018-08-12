<template>
  <div class="principal">
    <loading :show="loading.show" :message="loading.message"/>
    <div v-show="!loading.show && !connected" class="url">
      <input type="text" name="" id="" v-model="$store.state.server">
      <a @click="connect($store.state.server)" class="url-icon">
        <i data-feather="zap"></i>
      </a>
    </div>
    <div v-show="connected" class="content">
      <a v-if="!loading.show" class="btn btn-netflix" @click="sendRead">List Movies/Shows</a>
    </div>
  </div>
</template>

<script>
const socket = require("~/assets/js/socket.js");
import loading from '~/components/loading'

export default {
  name: "home",
  components: {
    loading
  },
  data() {
    return {
      socket: undefined,
      loading: {
        show: false,
        message: ""
      },
      connected: false,
      messages: [],
      netflix: {
        shows: [],
        genres: []
      },
      player: true,
      video: undefined
    };
  },
  methods: {
    connect: function(url) {
      this.loading.message = "Connecting";
      this.loading.show = true;
      let self = this
      socket.connect(url, (err, result) => {
        self.$store.state.socket = result.socket;
        this.connected = result.connected;
        if (result.connected) this.loading.show = false;
      });
    },
    sendRead: function() {
      this.loading.message = "Listing genres";
      this.loading.show = true;
      this.$store.state.socket.emit("stream", "all-genres");
      let self = this
      this.$store.state.socket.on("all-genres", genres => {
        self.$store.state.genres = genres
        this.loading.show = false
        this.$router.push("/genres")
      });
    }
    // open: function(index) {
    //   this.$socket.emit("stream", `${this.commands.open}:${index}`);
    //   this.player = true;
    // },
    // play: function() {
    //   this.$socket.emit("stream", this.commands.play_resume);
    // },
    // next: function() {
    //   this.$socket.emit("stream", this.commands.next);
    // },
    // fullscreen: function() {
    //   this.$socket.emit("stream", this.commands.fullscreen);
    // }
  },
  created() {
    $(function() {
      feather.replace();
    });
  }
};
</script>
<style>
.principal {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.principal .url {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.principal .url input {
  width: 50%;
  height: 50px;
  padding: 15px;

  border-top-left-radius: 0.3em;
  border-bottom-left-radius: 0.3em;
  border: none;

  color: #777;
  font-size: 20px;
}
.principal .url a {
  background: #333;
  padding: 10px;
  height: 50px;

  border-top-right-radius: 0.3em;
  border-bottom-right-radius: 0.3em;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
}
.principal .url .feather {
  stroke: #fff;
}

.principal .content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
