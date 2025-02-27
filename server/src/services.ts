import { join } from 'path'
import { createReadStream } from 'fs'
import { readdir, exists, readFile  } from 'fs/promises'
import { Mime } from 'mime'

const pdfDirectory = join(import.meta.dir, '../public/pdfs')
const mime = new Mime()

export async function getDocumentsList() {
  try {
    const filesList = await readdir(pdfDirectory, { encoding: 'utf-8' })
    const list = filesList.filter((file) => file.endsWith('.pdf'))
      .map((file) => ({ name: file, url: `/file/${file}` }))
    return list
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function getDocumentByFileName(filename: string) {
  const filePathEncoded = join(pdfDirectory, filename)
  const filePath = decodeURIComponent(filePathEncoded)

  const fileExists = await exists(filePath)
  if (!fileExists) {
    console.error(`File not found: ${filePath}`)
    return null
  }
  const fileBuffer = await readFile(filePath)
  return {
    contentType: mime.getType(filePath) || 'application/pdf',
    data: fileBuffer
  }
}
