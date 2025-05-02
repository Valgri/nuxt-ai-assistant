import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cxktvdflgefjsjryfuyl.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY || ''

export const useSupabase = () => {
  const supabase = createClient(supabaseUrl, supabaseKey)

  return {
    supabase
  }
}
