<template>
  <div id="app">
    <Toolbar></Toolbar>
    <flex-col>
      <LoadM3u8 v-on:m3u8Data="onM3u8Data($event)" v-on:channels="onChannels($event)"></LoadM3u8>
      <Channels v-if="m3u8Data.segments" v-bind:m3u8Data="m3u8Data" v-on:play="onPlay($event)"></Channels>
      <CountryChannels v-if="channels.length > 0" v-bind:channels="channels" v-on:play="onPlay($event)"></CountryChannels>
    </flex-col>
    <flex-row align-h="center" id="iptv-channels">
      <a href="https://github.com/iptv-org/iptv" target="_blank">Github IPTV</a>
      <a href="https://iptvcat.com/" target="_blank">IPTV Cat</a>
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
import CountryChannels from "./components/CountryChannels.vue";

export default {
  name: "App",
  data: () => ({
    m3u8Data: {},
    channels: [],
    playerOptions: null,
    showDialog: false
  }),
  methods: {
    onM3u8Data: function(m3u8Data) {
      this.m3u8Data = m3u8Data;
    },
    onChannels: function(channels) {
      this.channels = channels;
    },
    onPlay: function(url) {
      this.showDialog = true;
      this.playerOptions = {
        video: {
          url: url
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
    Channels,
    CountryChannels
  }
}
</script>

<style scoped>
  #iptv-channels a {
    text-decoration: none;
    padding: 4px;
  }
</style>
