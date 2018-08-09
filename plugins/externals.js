import Vue from 'vue'
import VueSocket from 'vue-socket.io'
import VueQrcodeReader from 'vue-qrcode-reader'

Vue.use(VueQrcodeReader)
Vue.use(VueSocket, 'https://socket-controller.herokuapp.com')