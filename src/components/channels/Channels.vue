<template>
  <div id="channels-by-channels">
    <div class="md-caption">
      Found {{channels.length}} channels
      <a v-if="!search" href="#" v-on:click="showSearch()">search</a>
      <a v-if="search" href="#" v-on:click="hideSearch()">hide search</a>
    </div>
    <ChannelsSearch v-show="search" v-bind:channels="channels" v-on:searched="onSearched($event)"></ChannelsSearch>
    <Channel v-if="!searched" v-bind:channels="channels" v-on:playURL="onPlayURL($event)"></Channel>
    <Channel v-if="searched" v-bind:channels="searchedChannels" v-on:playURL="onPlayURL($event)"></Channel>
  </div>
</template>

<script>
import ChannelsSearch from "./ChannelsSearch.vue";
import Channel from "./Channel.vue";

export default {
  name: "Channels",
  props: ["channels"],
  data: () => ({
    search: false,
    searched: false,
    searchedChannels: []
  }),
  methods: {
    onPlayURL: function(url) {
      this.$emit("play", url);
    },
    showSearch: function() {
      this.search = true;
    },
    hideSearch: function() {
      this.search = false;
    },
    onSearched: function(searchedChannels) {
      this.searched = true;
      this.searchedChannels = searchedChannels;
    }
  },
  components: {
    ChannelsSearch, Channel
  }
}
</script>

<style>
#channels-by-channels { padding: 16px; }
#channels-by-channels .md-button { height: initial; }
#channels-by-channels .md-avatar { margin: 4px; }
#channels-by-channels .md-avatar img { width: initial; }
</style>