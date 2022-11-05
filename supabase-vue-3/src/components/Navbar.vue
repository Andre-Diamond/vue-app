<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import Home from './Home.vue'
import InputForm from './InputForm.vue'
import Profile from './Profile.vue'
import NotFound from './NotFound.vue'
import { supabase } from '../supabase'

const loading = ref(true)
const username = ref('')
const website = ref('')
const avatar_url = ref('')
const src = ref('')

async function getProfile() {
    try {
      loading.value = true
      const { user } = session.value

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) throw error

      if (data) {
        username.value = data.username
        website.value = data.website
        avatar_url.value = data.avatar_url
      }
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
    }
  }

  const downloadImage = async () => {
    await getProfile()
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(avatar_url.value)
      if (error) throw error
      src.value = URL.createObjectURL(data)
    } catch (error) {
      console.error('Error downloading image: ', error.message)
    }
  }

const routes = {
  '/': Home,
  '/profile': Profile,
  '/inputform': InputForm
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})

const session = ref()

  onMounted(() => {
    supabase.auth.getSession().then(({ data }) => {
      session.value = data.session
      getProfile()
      downloadImage()
    })

    supabase.auth.onAuthStateChange((_, _session) => {
      session.value = _session
    })
  })
  
</script>

<template>
    <div>
        <button class="button m-3" onclick="location.href='#/'">Home</button>
        <button class="button m-3" onclick="location.href='#/inputform'">Input Form</button>
        <button class="button m-3" onclick="location.href='#/profile'">Profile</button>
        <img
          v-if="session"
          :src="src"
          onclick="location.href='#/profile'"
          alt="Avatar"
          class="Avatar is-pulled-right m-4"
          :style="{ height: 2 + 'em', width: 2 + 'em' }"
        />
        <p class="is-pulled-right mt-4 has-text-light" v-if="session" :session="session"> {{username}}</p>
        <p class="is-pulled-right m-4 has-text-light" v-else >Please sign in</p>
        <component :is="currentView" />
    </div>
</template>

<style>
.Avatar {
  border-radius: 50%;
}
</style>