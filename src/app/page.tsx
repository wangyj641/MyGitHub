import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex w-full h-full justify-between items-center p-8">
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Left</button>
      <button className="bg-green-500 text-white px-4 py-2 rounded">Right</button>
    </div>
  )
}