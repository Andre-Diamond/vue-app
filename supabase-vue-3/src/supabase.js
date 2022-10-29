import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const discordClientSecret = import.meta.env.DISCORD_CLIENT_SECRET
const discordClientId = import.meta.env.DISCORD_CLIENT_ID

export const supabase = createClient(supabaseUrl, supabaseAnonKey, discordClientSecret, discordClientId)