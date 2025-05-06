import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://vquccaekvoogktojxoam.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxdWNjYWVrdm9vZ2t0b2p4b2FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0NzQxMDcsImV4cCI6MjA2MjA1MDEwN30.jEDlDkIfQQdGRDIKJ4TVsAjY4KWa4W4m8gehVq0ic6k"

export const supabase = createClient(supabaseUrl, supabaseKey)
