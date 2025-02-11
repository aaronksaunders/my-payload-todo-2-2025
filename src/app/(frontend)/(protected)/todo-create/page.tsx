import { createTodo } from '@/app/actions/createTodoAction'
import { getUser } from '@/utils/get-user'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function TodoCreatePage() {
  // get user if exists
  const { user } = await getUser()
  if (!user) {
    redirect('/login')
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        width: '50%',
        padding: 20,
      }}
    >
      <h1>Todo Create</h1>
      <form
        action={async (formData) => {
          'use server'
          await createTodo(formData)
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 10 }}>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 10 }}>
          <label htmlFor="description">Description</label>
          <input type="text" name="description" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
          <label htmlFor="completed">Completed</label>
          <input type="checkbox" name="completed" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 10 }}>
          <label htmlFor="media">Media</label>
          <input type="file" name="media" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 10, marginTop: 20 }}>
          <button type="submit">Create</button>
          <Link href="/">Cancel</Link>
        </div>
      </form>
    </div>
  )
}
