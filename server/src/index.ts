import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { getDocumentByFileName, getDocumentsList } from './services'

const portNo = Number(Bun.env.PORT) || 3030

const app = new Elysia()
app.use(cors())
app.get('/file', async ({ set }) => {
  const result = await getDocumentsList()
  if (result === null) {
    set.status = 500
    return { error: '파일 목록을 가져오는 데 실패했습니다.' }
  }
  set.status = 200
  return result
})
app.get('/file/:filename', async ({ params, set }) => {
  const result = await getDocumentByFileName(params.filename)
  if (result === null) {
    set.status = 404
    return { error: '파일을 찾을 수 없습니다.' }
  }
  set.headers['Content-Type'] = result.contentType
  return result.data
})

app.listen(portNo)

console.log(`🚀 Server is running on http://localhost:${portNo}`)
