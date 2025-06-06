import { createClient } from '@supabase/supabase-js'

export const useSupabase = () => {
  const config = useRuntimeConfig()
  const supabase = createClient(config.public.supabase.url, config.public.supabase.key)

  return {
    supabase
  }
}
