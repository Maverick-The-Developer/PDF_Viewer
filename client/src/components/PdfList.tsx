import { useEffect, useState } from 'react'
import axios from 'axios'

interface PdfFile {
  name: string
  url: string
}

interface Props {
  onSelect: (fileUrl: string) => void
}

export default function PdfList({ onSelect }: Props) {
  const [pdfFiles, setPdfFiles] = useState<PdfFile[]>([])

  useEffect(() => {
    axios
      .get('http://localhost:3030/file')
      .then((response) => {
        setPdfFiles(response.data)
      })
      .catch((error) => {
        console.error('파일 목록을 불러오는 중 오류 발생:', error)
      })
  }, [])

  return (
      <div className='p-2 flex flex-col space-y-2'>
        {pdfFiles.map((file, index) => (
            <button
              key={index}
              type='button'
              className='text-left border rounded-lg p-2 text-sm bg-slate-50 cursor-pointer hover:bg-white'
              onClick={() => {
                console.log(file.url)
                onSelect(`http://localhost:3030${file.url}`)
              }}
            >
              {file.name}
            </button>
        ))}
      </div>
  )
}
