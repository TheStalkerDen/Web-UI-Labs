<template>
  <div class="container">
    <div v-if="$store.state.user">
      <router-link
        to="/create-question"
        custom
        v-slot="{ navigate, isActive, isExactActive }"
      >
        <button
          role="link"
          class="btn btn-primary mb-3"
          @click="navigate"
          :class="{ active: isActive, 'exact-active': isExactActive }"
        >
          Create new polling
        </button>
      </router-link>
    </div>
    <div v-else>
      <div class="alert alert-warning" role="alert">
        Only registered users can add new questions and take part in polling
      </div>
    </div>
    <QuestionList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import QuestionList from "@/components/QuestionList.vue";

export default defineComponent({
  name: "HomePage",
  components: { QuestionList },
});
</script>
