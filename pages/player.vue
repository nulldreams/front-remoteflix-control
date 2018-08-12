<template>
    <div class="player-content">
        <div class="info-ep">
            <!-- <p>Rick and Morty T1:E1 Piloto</p> -->
        </div>
        <div class="player">
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
            <a href="" class="control-btn">
                <i data-feather="slash"></i>
            </a>
        </div>        
    </div>
</template>
<script>
export default {
  created() {
    $(function() {
      feather.replace();
    });
  },
  data() {
      return {
        commands: {
            play_resume: "parar/continuar",
            next: "next",
            back: "back",
            fullscreen: "fullscreen",
            refresh: "refresh-info",
            read: "read",
            open: "open"
        }
      }
  },
  methods: {
    play: function() {
      this.$store.state.socket.emit("stream", this.commands.play_resume);
    },
    next: function() {
      this.$store.state.socket.emit("stream", this.commands.next);
    },
    fullscreen: function() {
      this.$store.state.socket.emit("stream", this.commands.fullscreen);
    }
  }
}
</script>
<style>
.player-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    height: 100vh;
}
.player-content .player {
    display: flex;
    flex-direction: row;
}
.player-content .player a {
    margin: 10px;
    background: #333;
}
.feather {
    stroke: #fff;
}
</style>

