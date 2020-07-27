<template>
  <div id="channel-search">
    <md-field>
      <label>Search</label>
      <md-input v-model="query" :md-change="search()"></md-input>
      <md-button v-if="query" class="md-icon" v-on:click="reset()">
        <md-icon>close</md-icon>
      </md-button>
    </md-field>
  </div>
</template>

<script>
export default {
  name: "ChannelSearch",
  props: ["channels"],
  data: () => ({
    query: null
  }),
  methods: {
    search: function() {
      let found = this.channels;
      if(this.query) {
        let re = new RegExp(`.*${this.query}.*`, "i");  
        found = this.channels.filter((item) => {
          return item.name.match(re) != null;
        });
      }
      this.$emit("searched", found);
    },
    reset: function() {
      this.query = null;
      this.$emit("searched", this.channels);
    }
  }
}
</script>

<style>
#channel-search {
  width: 200px;
}
</style>