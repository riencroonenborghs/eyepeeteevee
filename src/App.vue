<template>
  <div id="app">
    <Toolbar></Toolbar>

    <md-tabs class="md-transparent">
      <md-tab id="tab-url" md-icon="link">
        <LoadURL v-on:loaded="onLoadChannels($event)"></LoadURL>
      </md-tab>
      <md-tab id="tab-file" md-icon="attach_file">
        <LoadFile v-on:loaded="onLoadChannels($event)"></LoadFile>
      </md-tab>
      <md-tab id="tab-countries" md-icon="flag">
        <LoadCountries v-on:loaded="onLoadChannels($event)"></LoadCountries>
      </md-tab>
      <md-tab id="tab-languages" md-icon="language">
        <LoadLanguages v-on:loaded="onLoadChannels($event)"></LoadLanguages>
      </md-tab>
    </md-tabs>

    <flex-col>
      <Channels v-if="channels.length > 0" v-bind:channels="channels" v-on:play="onPlay($event)"></Channels>
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
import LoadURL from "./components/load/LoadURL.vue";
import LoadFile from "./components/load/LoadFile.vue";
import LoadCountries from "./components/load/LoadCountries.vue";
import LoadLanguages from "./components/load/LoadLanguages.vue";
import Channels from "./components/channels/Channels.vue";

export default {
  name: "App",
  data: () => ({
    channels: [],
    playerOptions: null,
    showDialog: false
  }),
  methods: {
    onLoadChannels: function(channels) {
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
    LoadURL, LoadFile, LoadCountries, LoadLanguages,
    Channels
  }
}
</script>

<style scoped>
  #iptv-channels a {
    text-decoration: none;
    padding: 4px;
  }
</style>
