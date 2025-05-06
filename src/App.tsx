import Header from "./components/Header"
import { supabase } from "./supabase-client"
import { useState, useEffect } from "react"
import { PostgrestError } from "@supabase/supabase-js"
import { CiCirclePlus } from "react-icons/ci"

type Ingredient = {
  ingredients: string[] // Corrected type for ingredients
}

type MenuItem = {
  id: number
  name: string
  emoji: string
  price: number
  ingredients: Ingredient
}

type supabaseResponse = {
  data: MenuItem[] | null
  error: PostgrestError | null
}

function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  useEffect(() => {
    async function fetchAllData() {
      try {
        const { data, error }: supabaseResponse = await supabase
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

  const menuElements =
    menuItems.length > 0 &&
    menuItems.map((item) => (
      <div
        key={item.id}
        className="first: mx-11.5 flex items-center gap-5 border-b-2 border-[#D2D2D2] py-13 pt-15.5"
      >
        <p className="text-7xl">{item.emoji}</p>
        <div>
          <p className="text-3xl">{item.name}</p>
          <p className="text-base text-[#8B8B8B]">
            {item.ingredients.ingredients.join(",")}
          </p>
          <p className="text-xl">${item.price}</p>
        </div>

        <button className="ml-auto cursor-pointer opacity-30 hover:opacity-100">
          <CiCirclePlus size={40} />
        </button>
      </div>
    ))
  return (
    <div className="mx-auto w-150 border-2 border-red-900">
      <Header />
      <section className="bg-gray-200">
        {menuItems.length > 0 && menuElements}
      </section>
    </div>
  )
}

export default App
