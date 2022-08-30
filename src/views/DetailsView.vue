<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="post" class="post">
    <h3>{{ post.title }}</h3>
    <p class="pre">{{ post.body }}</p>
    <button @click="handleClick" class="delete">Delete post</button>
  </div>
  <div v-else>
    <Spinner/>
  </div>
</template>

<script>
import getPost from "@/composables/getPost";
import Spinner from "@/components/Spinner";
import {projectFirestore} from "@/firebase/config";
import {useRouter} from "vue-router";

export default {
  name: "DetailsView.vue",
  components: {Spinner},
  props: ['id'],
  setup(props) {
    const router = useRouter()
    const {post, error, load} = getPost(props.id)
    load()

    const handleClick = async () => {
      await projectFirestore
          .collection('posts')
          .doc(props.id)
          .delete()

      router.push({ name: 'home' })
    }


    return {post, error, handleClick}
  }
}
</script>

<style scoped>
.post {
  margin: 0 40px 30px;
  padding-bottom: 30px;
  border-bottom: 1px dashed #e7e7e7;
}

.post h3 {
  display: inline-block;
  position: relative;
  font-size: 26px;
  color: white;
  margin-bottom: 10px;
  max-width: 400px;
}

.post h3::before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background: #ff8800;
  position: absolute;
  z-index: -1;
  padding-right: 40px;
  left: -30px;
  transform: rotateZ(-1deg);
}
.delete {
  margin: 10px auto;
  background: #ff8800;
  border: none;
  padding: 10px;
  font-weight: bold;
  color: #FFF;
  cursor: pointer;
}
</style>