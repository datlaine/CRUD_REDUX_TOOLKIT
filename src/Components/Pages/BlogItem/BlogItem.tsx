import IPost from 'Components/types/blog.type'
import React from 'react'
interface PropsBlogItem {
  blog: IPost
  handleDelete: (id: string) => void
  handleStartEdit: (id: string) => void
}

export default function BlogItem(props: PropsBlogItem) {
  const { blog, handleDelete, handleStartEdit } = props

  const handleClickRemove = (id: string) => {
    // console.log(id)
    handleDelete(id)
  }

  const handleClickUpdate = (id: string) => {
    // console.log(`Chỉnh sửa phần ${id}`)
    handleStartEdit(id)
  }

  return (
    <article className='flex flex-col dark:bg-gray-900' key={blog.id} id='content'>
      <a
        rel='noopener noreferrer'
        href={blog.image}
        aria-label='Te nulla oportere reprimique his dolorum'
      >
        <img alt='' className='object-cover w-full h-52 dark:bg-gray-500' src={blog.image} />
      </a>
      <div className='flex flex-col flex-1 p-6'>
        <p>{blog.content}</p>
        <h3 className='flex-1 py-2 text-lg font-semibold leadi'>{blog.id}</h3>
        <div>
          <button
            type='button'
            onClick={() => handleClickUpdate(blog.id)}
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
          >
            Edit
          </button>

          <span> </span>
          <button
            type='button'
            onClick={() => handleClickRemove(blog.id)}
            className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  )
}
