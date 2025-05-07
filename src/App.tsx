import Header from "./components/Header"
import { useState } from "react"
import { CiCirclePlus } from "react-icons/ci"
import useInitialLoadMenu from "./hooks/useInitialLoadMenu"
import { type MenuItem } from "./types/types"
import Orders from "./components/Orders"

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
          <form
            className="flex h-full w-full flex-col items-center justify-center gap-6 px-6 py-7.5"
            action={formAction}
          >
            <h3 className="font-verdana text-2xl font-bold">
              Enter card details
            </h3>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              aria-label="name"
              className="font-verdana w-full rounded-sm border-2 border-[#757575] px-4 py-2 text-xl font-normal text-[#757575]"
              required
            />
            <input
              type="number"
              name="cardNumber"
              placeholder="Enter card number"
              aria-label="card number"
              className="font-verdana w-full rounded-sm border-2 border-[#757575] px-4 py-2 text-xl font-normal text-[#757575]"
              required
            />
            <input
              type="number"
              name="cvv"
              placeholder="Enter CVV"
              aria-label="cvv"
              className="font-verdana w-full rounded-sm border-2 border-[#757575] px-4 py-2 text-xl font-normal text-[#757575]"
              required
            />
            <button className="font-verdana w-full cursor-pointer rounded-sm bg-[#16DB99] py-5 text-xl font-bold text-white">
              Pay
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default App
