<template>
  <div>
    <md-button v-for="channel in channels" :key="channel.id" v-on:click="playChannel(channel)">
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
  name: "Channels",
  props: ["channels"],
  methods: {
    playChannel: function(channel) {
      this.$emit("playURL", channel);
    }
  }
}
</script>

<style>
</style>