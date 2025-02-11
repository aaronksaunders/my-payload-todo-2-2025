import config from '@/payload.config'
import { getPayload } from 'payload'
import Image from 'next/image'
import { Media } from '@/payload-types'
import Link from 'next/link'
import { getUser } from '@/utils/get-user'
import { redirect } from 'next/navigation'

type Props = {
  params: Promise<{ id: string }> | { id: string }
}

export default async function TodoPage({ params }: Props) {
  // get user if exists
  const { user } = await getUser()
  if (!user) {
    redirect('/login')
  }

  const resolvedParams = await params
  const todoId = resolvedParams.id

  const response = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/todos/${todoId}`)
  const todo = await response.json()
  console.log(todo)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 20 }}>
      <Link href="/">Back to todos</Link>
      <h1>Todo {todo.title}</h1>
      <p>{todo.description}</p>
      <p>{todo.completed ? 'Completed' : 'Not Completed'}</p>
      <p>{todo.createdAt}</p>
      <p>{todo.updatedAt}</p>
      {todo.media && (
        <div style={{ width: 300, height: 300, margin: 16, marginTop: 20 }}>
          <Image
            src={(todo.media as Media).url!}
            alt={(todo.media as Media).alt ?? ''}
            width={(todo.media as Media).width ?? 0}
            height={(todo.media as Media).height ?? 0}
          />
        </div>
      )}
    </div>
  )
}
