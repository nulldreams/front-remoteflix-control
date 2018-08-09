<template>
<qrcode-reader :video-constraints="{ facingMode: 'user' }" @init="onInit">
  <b>stuff here overlays the camera stream</b>
</qrcode-reader>
</template>
<script>
export default {
  methods: {
    onDecode(decodedString) {
      alert(decodedString);
    },
    async onInit(promise) {
      // show loading indicator
      console.log(promise)

      try {
        await promise;

        // successfully initialized
      } catch (error) {
        if (error.name === "NotAllowedError") {
          alert(error.name)
        } else if (error.name === "NotFoundError") {
          alert(error.name)
        } else if (error.name === "NotSupportedError") {
          alert(error.name)
        } else if (error.name === "NotReadableError") {
          alert(error.name)
        } else if (error.name === "OverconstrainedError") {
          alert(error.name)
        } else {
          console.log('error')
        }
      } finally {
        console.log('works')
      }
    }
  }
};
</script>

<style>
.qrcode {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.qrcode .center-screen {
  height: 400px;
  width: 400px;
}
</style>

