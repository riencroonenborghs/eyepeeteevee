<template>
  <div id="load-categories">
    <form novalidate>
      <flex-row noWrap align-v="center" id="categories">
        <md-icon>category</md-icon>
        <md-autocomplete v-model="category" @md-selected="selected()" :md-options="categories">
          <label>Category</label>
        </md-autocomplete>
      </flex-row>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoadCategories",
  data: () => ({
    categories: [],
    category: null,
  }),
  methods: {
    selected: function() {
      let channels = this.$store.channelsService.findCategory(this.category);
      this.$emit("loaded", channels);
    }
  },
  mounted() {
    this.$store.channelsService.load().then(
      () => {
        this.categories = this.$store.channelsService.categories();
      }
    );
  }
}
</script>

<style>
#load-categories { 
  width: 600px;
  padding: 16px;
}
#load-categories #categories .md-icon { margin-right: 16px; }
</style>