import Header from "./components/Header"
import { useState } from "react"
import { CiCirclePlus } from "react-icons/ci"
import useInitialLoadMenu from "./hooks/useInitialLoadMenu"
import { nanoid } from "nanoid"

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

function App() {
  const [menuItems] = useInitialLoadMenu<MenuItem>()
  const [selectedItems, setSelectItems] = useState<MenuItem[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleSelectItem(id: number) {
    const selectItem = menuItems.find((item) => item.id === id)
    if (selectItem) {
      setSelectItems((prevSelectItems) => [...prevSelectItems, selectItem])
    }
  }

  function handleRemoveItem(id: number) {
    setSelectItems((prevSelectedItems) =>
      prevSelectedItems.filter((item) => item.id !== id),
    )
  }

  function handleCompleteOrder() {
    setIsModalOpen(true)
  }

  const menuElements =
    menuItems.length > 0 &&
    menuItems.map((item) => (
      <div
        key={item.id}
        className="flex items-center gap-5 border-b-2 border-[#D2D2D2] py-13 first:pt-15.5"
      >
        <p className="text-7xl">{item.emoji}</p>
        <div>
          <p className="text-3xl">{item.name}</p>
          <p className="text-base text-[#8B8B8B]">
            {item.ingredients.ingredients.join(",")}
          </p>
          <p className="text-xl">${item.price}</p>
        </div>

        <button
          className="ml-auto cursor-pointer opacity-30 hover:opacity-100"
          onClick={() => handleSelectItem(item.id)}
        >
          <CiCirclePlus size={40} />
        </button>
      </div>
    ))

  const selectedItemsElements = selectedItems.map((item) => (
    <div key={nanoid()} className="flex items-center justify-center gap-5.5">
      <p className="text-3xl font-normal">{item.name}</p>
      <button
        className="cursor-pointer text-sm text-[#BBBBBB]"
        onClick={() => handleRemoveItem(item.id)}
      >
        remove
      </button>
      <p className="ml-auto text-xl">${item.price}</p>
    </div>
  ))

  const totalPrice = selectedItems.reduce(
    (total, item) => total + item.price,
    0,
  )

  return (
    <div className="mx-auto w-150 border-2 border-red-900">
      <Header />
      <section className="bg-gray-200 px-11.5">
        {menuItems.length > 0 && menuElements}
      </section>

      {selectedItems.length > 0 && (
        <section className="bg-gray-200 px-11.5">
          <h2 className="pt-11.25 pb-16 text-center text-3xl font-normal">
            Your order
          </h2>
          {selectedItemsElements}
          <hr className="my-8 border-b-2 border-black bg-black" />
          <div className="flex items-center justify-between pb-14.25">
            <p className="text-3xl">Total price:</p>
            <p className="text-xl">${totalPrice}</p>
          </div>
          <button
            className="font-verdana mb-14.25 w-full cursor-pointer rounded-sm bg-[#16DB99] py-4.5 font-bold text-white"
            onClick={handleCompleteOrder}
          >
            Complete order
          </button>
        </section>
      )}
    </div>
  )
}

export default App
