<script setup>
  import { onMounted, ref } from 'vue'
  import Auth from './Auth.vue'
  import { supabase } from '../supabase'

  const session = ref()

  onMounted(() => {
    supabase.auth.getSession().then(({ data }) => {
      session.value = data.session
    })

    supabase.auth.onAuthStateChange((_, _session) => {
      session.value = _session
    })
  })
</script>

<template>
  <div>
    <div v-if="session" :session="session">whoops</div>
    <Auth v-else />
  </div>
</template>