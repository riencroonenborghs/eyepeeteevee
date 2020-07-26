<template>
  <div id="channels">
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
  name: "Toolbar",
  props: ["m3u8Data"],
  methods: {
    play: function(segment) {
      this.$emit("play", segment);
    }
  }
}
</script>

<style>
#channels .md-button { height: initial; }
#channels .md-avatar { margin: 4px; }
#channels .md-avatar img { width: initial; }
</style>