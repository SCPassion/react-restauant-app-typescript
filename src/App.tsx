import Header from "./components/Header"
import { useState } from "react"
import { CiCirclePlus } from "react-icons/ci"
import useInitialLoadMenu from "./hooks/useInitialLoadMenu"
import { type MenuItem } from "./types/types"
import Orders from "./components/Orders"
import Form from "./components/Form"

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

  function formAction(formData: FormData) {
    setIsModalOpen(false)
    const data = Object.fromEntries(formData)
    console.log(data)
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

  return (
    <div className="relative mx-auto w-150 border-2 border-red-900">
      <Header />
      <section className="bg-gray-200 px-11.5">
        {menuItems.length > 0 && menuElements}
      </section>

      {selectedItems.length > 0 && (
        <Orders
          selectedItems={selectedItems}
          handleRemoveItem={handleRemoveItem}
          handleCompleteOrder={handleCompleteOrder}
        />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 m-auto flex h-136 w-131 bg-white shadow-2xl">
          <Form formAction={formAction} />
        </div>
      )}
    </div>
  )
}

export default App
