import { Fragment, memo, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import { addBlog, cancelEdit, finishEdit } from 'Components/Reducer/blog.reducer'
import IPost from 'Components/types/blog.type'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import {} from '../LayOut/Layout'
import {useForm} from 'react-hook-form'
// interface Iform {
//   id: string
//   content: string
//   image: string
// }

const intitialForm: IPost = {
  content: '',
  id: '',
  image: '',
}

function Form() {
  const startEditing = useSelector((state: RootState) => state.blog.startEditing)
  const focus = useSelector((state: RootState) => state.blog.focus)
  const [form, setForm] = useState<IPost>(intitialForm)
  const inputFocus = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()


  // xử lí form

  useEffect(() => {
    if (focus) {
      console.log('focus')
      if (inputFocus.current) {
        inputFocus.current.focus()
      }
    }
    console.log('form')
    setForm(startEditing || intitialForm)
  }, [startEditing])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, content: event.target.value }))
  }

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const reader = new FileReader()
      let file = event.target.files[0]
      reader.readAsDataURL(file)
      reader.addEventListener('load', (event: ProgressEvent<FileReader>) => {
        setForm((prev) => ({ ...prev, image: event.target?.result as string }))
      })
    }
  }

  
  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (startEditing) {
      dispatch(finishEdit(form))
    } else {
      const formWithId = { ...form, id: new Date().toISOString() }
      dispatch(addBlog(formWithId))
    }
    console.log(form)
    setForm(intitialForm)
  }

  

  const handleCancel = () => {
    dispatch(cancelEdit())
  }

  return (
    <form onSubmit={handleSubmitForm} onReset={handleCancel} id='form'>
      <div className='space-y-12'>
        <div className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base font-semibold leading-7 text-gray-900'>Profile</h2>
          <p className='mt-1 text-sm leading-6 text-gray-600'>
            This information will be displayed publicly so be careful what you share.
          </p>

          <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='col-span-full'>
              <label htmlFor='about' className='block text-sm font-medium leading-6 text-gray-900'>
                About
              </label>
              <div className='mt-2'>
                <input
                  ref={inputFocus}
                  id='about'
                  name='about'
                  placeholder='Nhập nội dung của bạn'
                  value={form.content}
                  className='p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  onChange={handleChange}
                />
              </div>
              <p className='mt-3 text-sm leading-6 text-gray-600'>
                Write a few sentences about yourself.
              </p>
            </div>

            <div className='col-span-full'>
              <label htmlFor='photo' className='block text-sm font-medium leading-6 text-gray-900'>
                Photo
              </label>
              <div className='mt-2 flex items-center gap-x-3'>
                <UserCircleIcon className='h-12 w-12 text-gray-300' aria-hidden='true' />
                <button
                  type='button'
                  className='rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                >
                  Change
                </button>
              </div>
            </div>

            <div className='col-span-full'>
              <label
                htmlFor='cover-photo'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Cover photo
              </label>
              <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
                <div className='text-center'>
                  <PhotoIcon className='mx-auto h-12 w-12 text-gray-300' aria-hidden='true' />
                  <div className='mt-4 flex text-sm leading-6 text-gray-600'>
                    <label
                      htmlFor='file-upload'
                      className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
                    >
                      <span>Upload a file</span>
                      <input
                        id='file-upload'
                        name='file-upload'
                        type='file'
                        className='sr-only'
                        onChange={handleChangeFile}
                      />
                    </label>
                    <p className='pl-1'>or drag and drop</p>
                  </div>
                  <p className='text-xs leading-5 text-gray-600'>PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-6 flex items-center justify-end gap-x-6'>
        {startEditing && (
          <Fragment>
            <button type='reset' className='text-sm font-semibold leading-6 text-gray-900'>
              Cancel
            </button>
            <button
              type='submit'
              className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Save
            </button>
          </Fragment>
        )}
        {!startEditing && (
          <button
            type='submit'
            className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Submit
          </button>
        )}
      </div>
    </form>
  )
}

export default memo(Form)
