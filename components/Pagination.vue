<template>
  <v-pagination v-model="page" :length="length"></v-pagination>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("rss", ["filteredPosts"]),
    length() {
      if (!this.filteredPosts) {
        return 0;
      }
      return Math.ceil(this.filteredPosts.length / 5);
    },
    page: {
      set(value) {
        this.$store.commit("rss/setPage", value);
      },
      get() {
        return this.$store.state.rss.page;
      },
    },
  },
};
</script>