<template>
    <div class="shows">
        <loading :show="loading.show" :message="loading.message"/>
        <div v-if="!loading.show" class="show" v-for="(show, index) in $store.state.shows" :key="index">
            <img class="img-fluid" :src="show.img" alt="" @click="open(show)">
        </div>
    </div>
</template>
<style>
.shows {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  height: 100vh;
}
.shows > .show {
  width: 200px;
  height: auto;
  margin: 5px;
}
</style>
<script>
import loading from '~/components/loading'
export default {
    components: {
        loading
    },
    data() {
        return {
            loading: {
                show: false,
                message: ""
            }
        }
    },
    methods: {
        open: function(show) {
            this.loading.message = show.name
            this.loading.show = true
            this.$store.state.socket.emit("stream", `open:${show.path}`)
            this.player = true
            this.$router.push("/player")
        }
    }
}
</script>
