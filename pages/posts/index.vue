<template>
  <v-row>
    <v-col
      cols="12"
      sm="8"
      md="6"
      offset-sm="2"
      offset-md="3"
      lg="4"
      offset-lg="4"
    >
      <Filters @search-post="searchPost($event)" />
      <Posts :posts="paginatedPosts" />
    </v-col>
  </v-row>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import Filters from "@/components/Filters.vue";
import Posts from "@/components/Posts.vue";
export default {
  components: {
    Filters,
    Posts,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("rss", ["paginatedPosts"]),
    ...mapState("rss", [
      "feed",
      "loading",
      "error",
      "search",
      "ordering",
      "page",
    ]),
  },
};
</script>
