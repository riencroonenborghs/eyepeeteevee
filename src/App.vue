<template>
  <div id="app">
    <Toolbar></Toolbar>

    <md-tabs class="md-transparent">
      <md-tab id="tab-countries" md-icon="flag">
        <LoadCountries v-on:loaded="onLoadChannels($event)"></LoadCountries>
      </md-tab>
      <md-tab id="tab-languages" md-icon="language">
        <LoadLanguages v-on:loaded="onLoadChannels($event)"></LoadLanguages>
      </md-tab>
      <md-tab id="tab-categories" md-icon="category">
        <LoadCategories v-on:loaded="onLoadChannels($event)"></LoadCategories>
      </md-tab>
      <md-tab id="tab-url" md-icon="link" v-if="urlEnabled">
        <LoadURL v-on:loaded="onLoadChannels($event)"></LoadURL>
      </md-tab>
      <md-tab id="tab-file" md-icon="attach_file">
        <LoadFile v-on:loaded="onLoadChannels($event)"></LoadFile>
      </md-tab>
      <md-tab id="tab-thanks" md-icon="thumb_up">
        Thanks to
        <a href="https://github.com/iptv-org/iptv" target="_blank">Github IPTV</a> and
        <a href="https://www.matthuisman.nz" target="_blank">Matt Huisman</a>
      </md-tab>
    </md-tabs>

    <flex-col>
      <Channels v-if="channels.length > 0" v-bind:channels="channels" v-on:play="onPlay($event)"></Channels>
    </flex-col>

    <md-dialog v-if="channel != null" :md-active.sync="showDialog" :md-close-on-esc="false" :md-click-outside-to-close="false">
      <md-dialog-title>
        <flex-row align-h="between">
          <div>
            <md-avatar>
              <img :src="channel.logo" :alt="channel.name">
            </md-avatar>
            {{channel.name}}
          </div>
          <md-button class="md-icon-button" @click="stopPlaying()">
            <md-icon>close</md-icon>
          </md-button>
        </flex-row>
      </md-dialog-title>
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
import LoadCategories from "./components/load/LoadCategories.vue";
import Channels from "./components/channels/Channels.vue";

export default {
  name: "App",
  data: () => ({
    channels: [],
    playerOptions: null,
    channel: null,
    showDialog: false,
    urlEnabled: false
  }),
  methods: {
    onLoadChannels: function(channels) {
      this.channels = channels;
    },
    onPlay: function(channel) {
      this.channel = channel;
      this.playerOptions = {
        video: {
          url: channel.url
        },
        autoplay: true
      }
      this.showDialog = true;
    },
    stopPlaying: function() {
      this.channel = null;
      this.showDialog = false;
      this.$refs.player.dplayer.destroy();
      this.playerOptions = null;
    }
  },
  components: {
    Toolbar,
    LoadURL, LoadFile, LoadCountries, LoadLanguages, LoadCategories,
    Channels
  }
}
</script>

<style scoped>
  #tab-thanks a {
    text-decoration: none;
    padding-left: 4px;
  }
</style>
