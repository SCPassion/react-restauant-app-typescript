type FormProps = {
  formAction: (formData: FormData) => void
}

export default function Form({ formAction }: FormProps) {
  return (
    <form
      className="flex h-full w-full flex-col items-center justify-center gap-6 px-6 py-7.5"
      action={formAction}
    >
      <h3 className="font-verdana text-2xl font-bold">Enter card details</h3>
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
  )
}
