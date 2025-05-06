import { useState, useEffect } from "react"
import { supabase } from "../supabase-client"
import { PostgrestError } from "@supabase/supabase-js"

type supabaseResponse<T> = {
  data: T[] | null
  error: PostgrestError | null
}

export default function useInitialLoadMenu<T>() {
  const [menuItems, setMenuItems] = useState<T[]>([])

  useEffect(() => {
    async function fetchAllData() {
      try {
        const { data, error }: supabaseResponse<T> = await supabase
          .from("menu")
          .select("*")

        if (error) {
          throw new Error(`Error fetching data: ${error.message}`)
        }
        if (data) {
          setMenuItems(data)
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching data:", error)
        }
      }
    }

    fetchAllData()
  }, [])

  return [menuItems]
}
