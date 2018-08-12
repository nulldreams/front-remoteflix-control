<template>
    <div class="generos">
        <loading :show="loading.show" :message="loading.message"/>
        <div v-if="!loading.show" class="genres">
            <div class="genre animated rubberBand" v-for="(genre, index) in $store.state.genres" :key="index" @click="listGenre(index)">{{ genre }}</div>
        </div>
    </div>
</template>
<script>
import loading from "~/components/loading";

export default {
  data() {
    return {
      loading: {
        show: false,
        message: ""
      }
    };
  },
  components: {
    loading
  },
  methods: {
    listGenre: function(genre) {
      this.loading.message = this.$store.state.genres[genre];
      this.loading.show = true;
      this.$store.state.socket.emit("stream", `list-genre:${genre}`);
      let self = this;
      this.$store.state.socket.on("list-genre", shows => {
        self.$store.state.shows = shows;
        this.$router.push("/shows");
      });
    }
  }
};
</script>
<style>
.generos {
  display: flex;
  justify-content: center;
  height: 100vh;
}
.genres {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
}
.genres > .genre {
  font-family: "Nunito", sans-serif;
  background: #333;
  padding: 20px;
  border-radius: 0.25em;
  margin: 10px;
  width: 100%;
  text-align: center;
}
</style>

