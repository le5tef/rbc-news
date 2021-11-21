<template>
  <v-card class="mx-auto my-2" elevation="5">
    <v-img
      class="white--text align-end"
      height="200px"
      v-if="post.media"
      :src="image"
    >
      <v-card-title>#{{ post.categories[0] }}</v-card-title>
    </v-img>
    <NuxtLink class="text-decoration-none" :to="`/posts/${post.id}`">
      <v-card-title class="word-break">{{ post.title }}</v-card-title>
    </NuxtLink>
    <v-divider />

    <v-card-text class="text--primary">
      <div>{{ post.content }}</div>
    </v-card-text>
    <v-divider />
    <v-card-subtitle class="pb-0">
      {{ post.author }} <br v-if="post.author" />{{
        $moment(post.pubDate).format("DD.MM.YY, HH:mm ")
      }}
    </v-card-subtitle>
    <v-card-actions>
      <v-spacer />
      <v-btn color="orange" :href="post.link" target="_blank" text>
        Статья РБК
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
    },
  },
  computed: {
    image() {
      return this.post.media[0][`rbc_news:url`][0];
    },
  },
};
</script>
<style scoped>
.word-break {
  word-break: break-word;
}
</style>