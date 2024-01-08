import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex justify-between items-center p-8">
      <button className="bg-blue-500 text-white px-4 py-2 rounded">左边按钮</button>
      <div className="flex-grow"></div>
      <button className="bg-green-500 text-white px-4 py-2 rounded">右边按钮</button>
    </div>
  )
}