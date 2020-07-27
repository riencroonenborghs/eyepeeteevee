<template>
  <div id="channels-by-segments">
    <md-button v-for="segment in m3u8Data.segments" :key="segment.tvgId" v-on:click="play(segment)">
      <flex-row noWrap align-v="center">
        <md-avatar>
          <img :src="segment.inf.tvgLogo" :alt="segment.inf.title">
        </md-avatar>
        <div>{{segment.inf.title}}</div>
      </flex-row>
    </md-button>
  </div>
</template>

<script>
export default {
  name: "ChannelsBySegments",
  props: ["m3u8Data"],
  methods: {
    play: function(segment) {
      this.$emit("play", segment.url);
    }
  }
}
</script>

<style>
#channels-by-segments { padding: 16px; }
#channels-by-segments .md-button { height: initial; }
#channels-by-segments .md-avatar { margin: 4px; }
#channels-by-segments .md-avatar img { width: initial; }
</style>