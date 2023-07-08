import Blog from '../Blog'
import Form from '../Form'

// More posts...
export default function Layout() {
  return (
    <div
      style={{
        width: '800px',
        margin: ' 25px auto 0px',
        display: ' flex',
        flexDirection: 'column',
        justifyContent: ' center',
        alignItems: ' center',
        gap: '20px',
      }}
    >
      <Form />
      <Blog />
    </div>
  )
}
