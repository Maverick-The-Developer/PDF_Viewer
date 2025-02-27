import { useState } from 'react'
import PdfList from './components/PdfList'
import PdfViewer from './components/PdfViewer'
import { IoClose, IoMenu } from 'react-icons/io5'

import './App.css'

export default function App() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [showMenu, setShowMenu] = useState(false)

  const toggleShowMenu = () => {
    setShowMenu((prev) => !prev)
  }

  return (
    <div className='overflow-hidden w-full h-full flex flex-col'>
      <h1 className='text-4xl font-bold text-center py-4'>
        PDF 뷰어
        <button
          className='absolute left-2 cursor-pointer'
          type='button'
          onClick={() => toggleShowMenu()}
        >
          {showMenu ? <IoClose /> : <IoMenu />}
        </button>
      </h1>
      <div className='flex-1 flex justify-start items-stretch gap-4 overflow-hidden border relative'>
        {showMenu && (
          <div className='z-100 w-auto absolute top-0 left-0 h-full bg-slate-50 overflow-auto' onClick={() => setShowMenu(false)}>
            <div className='p-2 text-center text-lg font-bold bg-white'>
              PDF 목록
            </div>
            <PdfList onSelect={setSelectedFile} />
          </div>
        )}
        <div className='flex-1 h-full overflow-auto'>
          {selectedFile ? (
            <PdfViewer fileUrl={selectedFile} />
          ) : (
            <h2 className='text-xl'>PDF를 선택하세요</h2>
          )}
        </div>
      </div>
    </div>
  )
}
