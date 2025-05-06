export default function Header() {
  return (
    <header className="flex h-42 flex-col justify-center gap-5 bg-[url('/burger.jpg')] bg-cover bg-center px-12 text-white">
      <h1 className="text-5xl font-normal">Jimmy's Diner</h1>
      <p className="text-xl font-normal">
        The best burgers and pizzas in town.
      </p>
    </header>
  )
}
