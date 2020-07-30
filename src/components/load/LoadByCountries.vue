<template>
  <div id="load-by-countries">
    <form novalidate>
      <flex-row noWrap align-v="center" id="countries">
        <md-field>
          <md-icon>flag</md-icon>
          <label for="country">Country</label>
          <md-select v-model="country" name="country" id="country" @md-selected="selected()">
            <md-option v-for="country in countries"  :key="country" :value="country">{{country}}</md-option>
          </md-select>
        </md-field>
      </flex-row>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoadByCountries",
  data: () => ({
    countries: [],
    country: null
  }),
  methods: {
    selected: function() {
      let channels = this.$store.channelsService.findCountry(this.country);
      this.$emit("loaded", channels);
    }
  },
  mounted() {
    console.log("LoadByCountries mounted -- 1");
    this.$store.channelsService.load().then(
      () => {
        this.countries = this.$store.channelsService.countries();
      }
    );
    console.log("LoadByCountries mounted -- 2");
  }
}
</script>

<style>
#load-by-countries { 
  width: 600px;
  padding: 16px;
}
#load-by-countries #countries .md-menu.md-select {
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