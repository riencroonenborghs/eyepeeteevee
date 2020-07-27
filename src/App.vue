<template>
  <div id="app">
    <Toolbar></Toolbar>

    <md-tabs class="md-transparent">
      <md-tab id="tab-url" md-icon="link">
        <LoadByURL v-on:loaded="onLoadM3u8Data($event)"></LoadByURL>
      </md-tab>
      <md-tab id="tab-file" md-icon="attach_file">
        <LoadByUploadedFile v-on:loaded="onLoadM3u8Data($event)"></LoadByUploadedFile>
      </md-tab>
      <md-tab id="tab-countries" md-icon="flag">
        <LoadByCountries v-on:loaded="onLoadChannels($event)"></LoadByCountries>
      </md-tab>
      <md-tab id="tab-languages" md-icon="language">
        <LoadByLanguages v-on:loaded="onLoadChannels($event)"></LoadByLanguages>
      </md-tab>
    </md-tabs>

    <flex-col>
      <ChannelsBySegments v-if="m3u8Data.segments" v-bind:m3u8Data="m3u8Data" v-on:play="onPlay($event)"></ChannelsBySegments>
      <ChannelsByChannels v-if="channels.length > 0" v-bind:channels="channels" v-on:play="onPlay($event)"></ChannelsByChannels>
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
import LoadByURL from "./components/load/LoadByURL.vue";
import LoadByUploadedFile from "./components/load/LoadByUploadedFile.vue";
import LoadByCountries from "./components/load/LoadByCountries.vue";
import LoadByLanguages from "./components/load/LoadByLanguages.vue";
import ChannelsBySegments from "./components/channels/ChannelsBySegments.vue";
import ChannelsByChannels from "./components/channels/ChannelsByChannels.vue";

export default {
  name: "App",
  data: () => ({
    m3u8Data: {},
    channels: [],
    playerOptions: null,
    showDialog: false
  }),
  methods: {
    onLoadM3u8Data: function(m3u8Data) {
      this.m3u8Data = m3u8Data;
      this.channels = [];
    },
    onLoadChannels: function(channels) {
      this.channels = channels;
      this.m3u8Data = {};
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
    LoadByURL, LoadByUploadedFile, LoadByCountries, LoadByLanguages,
    ChannelsBySegments, ChannelsByChannels
  }
}
</script>

<style scoped>
  #iptv-channels a {
    text-decoration: none;
    padding: 4px;
  }
</style>
