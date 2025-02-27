import { Document, Page, pdfjs } from 'react-pdf'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { Button } from '@mui/material'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

interface Props {
  fileUrl: string
}

export default function PdfViewer({ fileUrl }: Props) {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [docWidth, setDocWidth] = useState(200)
  const [showTextLayer, setShowTextLayer] = useState(false)

  const onResizeWindow = useCallback(() => {
    if (wrapperRef.current) {
      const width = wrapperRef.current.clientWidth
      setDocWidth(width)
    }
  }, [wrapperRef])

  useLayoutEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollIntoView({ behavior: 'smooth' })
      const width = wrapperRef.current.clientWidth
      setDocWidth(width)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', onResizeWindow)
    return () => {
      window.removeEventListener('resize', onResizeWindow)
    }
  }, [onResizeWindow])
  return (
    <div ref={wrapperRef} className='relative w-full min-h-[200px]'>
      <div className='sticky top-0 bg-white z-10 py-2 px-4 border-b border-b-gray-300 flex justify-end items-center'>
        <button
          type='button'
          className='bg-slate-200 px-4 py-1 rounded-xl cursor-pointer'
          onClick={() => setShowTextLayer((prev) => !prev)}
        >
          텍스트 추출 박스 토글
        </button>
      </div>
      <Document
        file={fileUrl}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        <Page
          width={docWidth}
          pageNumber={pageNumber}
          renderTextLayer={showTextLayer}
          renderAnnotationLayer={false}
        />
      </Document>
      <div className='flex justify-center items-center'>
        <Button
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber((p) => p - 1)}
        >
          이전
        </Button>
        <span>
          {pageNumber} / {numPages}
        </span>
        <Button
          disabled={pageNumber >= (numPages || 1)}
          onClick={() => setPageNumber((p) => p + 1)}
        >
          다음
        </Button>
      </div>
    </div>
  )
}
