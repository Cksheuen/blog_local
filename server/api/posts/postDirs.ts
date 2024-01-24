import path from 'node:path'
import process from 'node:process'
import fs from 'node:fs'
import matter from 'gray-matter'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const postsDirectory = path.join('public', 'posts', body.path)

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace('/\.md$/', '')

    const fsState = fs.statSync(path.join(postsDirectory, fileName))
    const cdate = fsState.ctime

    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    return {
      id,
      cdate,
      ...matterResult.data,

    }
  })
  return allPostsData.sort((a, b) => a.cdate < b.cdate ? 1 : -1)
})
