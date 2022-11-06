<script setup>
  import { ref } from 'vue'
  import { supabase } from '../supabase'

  const loading = ref(false)
  const email = ref('')

  async function signInWithDiscord() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
  })
}

</script>

<template>
  <form class="row flex-center flex" @submit.prevent="signInWithDiscord()">
    <div class="col-6 form-widget">
      <h1 class="header">Login</h1>
      <p class="description">You need to login</p>
      <div>
        <input
          type="submit"
          class="button block"
          :value="loading ? 'Loading' : 'Login via Discord'"
          :disabled="loading"
        />
      </div>
    </div>
  </form>
</template>