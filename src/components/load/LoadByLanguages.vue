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
import { ChannelsService } from "../../services/ChannelsService";

export default {
  name: "LoadByLanguage",
  data: () => ({
    channelsService: null,
    languages: [],
    language: null
  }),
  methods: {
    selected: function() {
      let channels = this.channelsService.findLanguage(this.language);
      this.$emit("loaded", channels);
    }
  },
  mounted() {
    this.channelsService = new ChannelsService(this.$http);
    this.channelsService.load().then(
      () => {
        this.languages = this.channelsService.languages();
      }
    );
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