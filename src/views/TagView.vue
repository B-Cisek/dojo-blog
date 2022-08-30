<template>
  <div class="tag">
    <div v-if="error">{{ error }}</div>
    <div v-if="posts.length" class="layout">
      <PostList :posts="postsWithTags"/>
      <TagCloud :posts="posts"/>
    </div>
    <div v-else>
      <Spinner/>
    </div>
  </div>
</template>

<script>
import getPosts from "@/composables/getPosts";
import Spinner from "@/components/Spinner";
import PostList from "@/components/PostList";
import TagCloud from "@/components/TagCloud";
import {useRoute} from "vue-router";
import {computed} from "vue";

export default {
  name: "TagView",
  props: ['tag'],
  components: {Spinner, PostList, TagCloud},
  setup(props) {
    const route = useRoute()
    const {posts, error, load} = getPosts()
    load()

    const postsWithTags = computed(() => {
      return posts.value.filter((post) => post.tags.includes(route.params.tag))
    })

    return {postsWithTags, error, posts}
  }
}
</script>

<style scoped>
.tag {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
}
</style>