<template>
  <div id="country-channels">
    <md-button v-for="channel in channels" :key="channel.id" v-on:click="play(channel)">
      <flex-row noWrap align-v="center">
        <md-avatar>
          <img :src="channel.logo" :alt="channel.name">
        </md-avatar>
        <div>{{channel.name}}</div>
      </flex-row>
    </md-button>
  </div>
</template>

<script>
export default {
  name: "CountryChannels",
  props: ["channels"],
  methods: {
    play: function(channel) {
      this.$emit("play", channel.url);
    }
  }
}
</script>

<style>
#country-channels { padding: 16px; }
#country-channels .md-button { height: initial; }
#country-channels .md-avatar { margin: 4px; }
#country-channels .md-avatar img { width: initial; }
</style>