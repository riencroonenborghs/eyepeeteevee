<template>
  <div id="load-by-languages">
    <form novalidate>
      <flex-row noWrap align-v="center" id="languages">
        <md-field>
          <md-icon>language</md-icon>
          <label for="country">Language</label>
          <md-select v-model="language" name="language" id="language" @md-selected="selected()">
            <md-option v-for="language in languages"  :key="language" :value="language">{{language}}</md-option>
          </md-select>
        </md-field>
      </flex-row>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoadByLanguage",
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
  created() {
    console.log("LoadByLanguage mounted -- 1");
    this.$store.channelsService.load().then(
      () => {
        this.languages = this.$store.channelsService.languages();
      }
    );
    console.log("LoadByLanguage mounted -- 1");
  }
}
</script>

<style>
#load-by-languages { 
  width: 600px;
  padding: 16px;
}
#load-by-languages #languages .md-menu.md-select {
  padding-left: 12px;
}

.md-menu-content {
  min-width: initial;
  max-width: initial;
}
.md-menu-content.md-select-menu {
  width: 600px;
}
</style>