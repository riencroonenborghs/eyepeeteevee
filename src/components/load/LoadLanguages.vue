<template>
  <div id="load-languages">
    <form novalidate>
      <flex-row noWrap align-v="center" id="languages">
        <md-icon>language</md-icon>
        <md-autocomplete v-model="language" @md-selected="selected()" :md-options="languages">
          <label>Language</label>
        </md-autocomplete>
      </flex-row>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoadLanguage",
  data: () => ({
    languages: [],
    language: null
  }),
  methods: {
    selected: function() {
      let channels = this.$store.channelsService.findLanguage(this.language);
      this.$emit("loaded", channels);
    }
  },
  mounted() {
    this.$store.channelsService.load().then(
      () => {
        this.languages = this.$store.channelsService.languages();
      }
    );
  }
}
</script>

<style>
#load-languages { 
  width: 600px;
  padding: 16px;
}
#load-languages #languages .md-icon { margin-right: 16px; }
</style>