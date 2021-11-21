<template>
  <div>
    <Post v-for="post in posts" :post="post" :key="post.id" :summary="true" />
    <Pagination />
  </div>
</template>
<script>
import Post from "@/components/PostSummary.vue";
import Pagination from "@/components/Pagination.vue";

export default {
  props: {
    posts: {
      type: Array,
    },
  },
  components: {
    Post,
    Pagination,
  },
  computed: {},
};
</script>