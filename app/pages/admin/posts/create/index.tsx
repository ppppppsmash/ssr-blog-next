import Editor, { FinalPost } from '@/components/editor'
import AdminLayout from '@/components/layout/AdminLayout'
import axios from 'axios'
import { NextPage } from 'next'

interface Props {}

const Create: NextPage<Props> = () => {

  const handleSubmit = async (post: FinalPost) => {
    try {
      // FormData
      const formData = new FormData()
      for(let key in post) {
        const value = (post as any)[key]
        if(key === 'tags' && value.trim()) {
          const tags = value.split(',').map((tag: string) => tag.trim())
          formData.append('tags', JSON.stringify(tags))
        } else {
          formData.append(key, value)
        }
      }
      // submit post
      const {data} = await axios.post('/api/posts', formData)
      console.log(data)
    } catch (error: any) {
      console.log(error.response.data)
    }
  }
  return (
    <AdminLayout title='新しいポスト'>
      <div className='max-w-4xl mx-auto'>
        <Editor 
          onSubmit={handleSubmit}
          initialValue={{
            title: '',
            meta: '',
            content: '',
            slug: '',
            tags: '',
            thumbnail: ''
          }}
        />
      </div>
    </AdminLayout>
  )
}

export default Create