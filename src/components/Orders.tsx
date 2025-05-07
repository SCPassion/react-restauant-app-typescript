import { type MenuItem } from "../types/types"
import { nanoid } from "nanoid"

type OrdersProps = {
  selectedItems: MenuItem[]
  handleRemoveItem: (id: number) => void
  handleCompleteOrder: () => void
}

export default function Orders({
  selectedItems,
  handleRemoveItem,
  handleCompleteOrder,
}: OrdersProps) {
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
  )
}
