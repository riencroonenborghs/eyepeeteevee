<template>
  <div id="app">
    <Toolbar></Toolbar>
    <flex-row>
      <LoadM3u8 v-on:m3u8Data="onM3u8Data($event)"></LoadM3u8>
      <Channels v-bind:m3u8Data="m3u8Data" v-on:play="onPlay($event)"></Channels>
    </flex-row>

    <md-dialog :md-active.sync="showDialog" :md-close-on-esc="false" :md-click-outside-to-close="false">
      <vue-better-dplayer  v-if="playerOptions" :options="playerOptions" ref="player"></vue-better-dplayer>
      <md-dialog-actions>
        <md-button class="md-primary" @click="stopPlaying()">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import Toolbar from "./components/Toolbar.vue";
import LoadM3u8 from "./components/LoadM3u8.vue";
import Channels from "./components/Channels.vue";

export default {
  name: "App",
  data: () => ({
    m3u8Data: {},
    playerOptions: null,
    showDialog: false
  }),
  methods: {
    onM3u8Data: function(m3u8Data) {
      this.m3u8Data = m3u8Data;
    },
    onPlay: function(segment) {
      this.showDialog = true;
      this.playerOptions = {
        video: {
          url: segment.url
        },
        autoplay: true
      }
    },
    stopPlaying: function() {
      this.showDialog = false;
      this.$refs.player.dplayer.destroy();
      this.playerOptions = null;
    }
  },
  components: {
    Toolbar,
    LoadM3u8,
    Channels
  }
}
</script>

<style>
</style>
