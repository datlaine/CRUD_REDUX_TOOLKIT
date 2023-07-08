import { deleteBlog, startEditingBlog } from 'Components/Reducer/blog.reducer'
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import BlogItem from '../BlogItem/BlogItem'

function Blog() {
  const blogList = useSelector((state: RootState) => state.blog.postList)
  const dispatch = useDispatch()
  const handleDelete = (id: string) => {
    dispatch(deleteBlog(id))
  }

  const handleStartEdit = (id: string) => {
    dispatch(startEditingBlog(id))
  }

  return (
    <section className='py-6 sm:py-12 dark:bg-gray-800 dark:text-gray-100'>
      <div className='container p-6 mx-auto space-y-8'>
        <div className='space-y-2 text-center'>
          <h2 className='text-3xl font-bold'>Partem reprimique an pro</h2>
          <p className='font-serif text-sm dark:text-gray-400'>
            Qualisque erroribus usu at, duo te agam soluta mucius.
          </p>
        </div>
        <div className='grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4'>
          {blogList.map((blog) => (
            <BlogItem
              blog={blog}
              key={blog.id}
              handleDelete={handleDelete}
              handleStartEdit={handleStartEdit}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default memo(Blog)
