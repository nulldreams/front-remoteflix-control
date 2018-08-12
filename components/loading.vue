<template>
    <div v-if="show" class="loading">
        <h1>{{ message }}</h1>
        <img class="img-fluid" src="loading.gif" alt="">
    </div>
</template>
<script>
export default {
    name: 'loading',
    props: {
        show: Boolean,
        message: String
    }
}
</script>
<style>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  font-family: "Nunito", sans-serif;
  text-transform: uppercase;
  font-size: 14px;
  color: #fff;
}
.loading img {
  width: 60px;
}
</style>


