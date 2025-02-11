import Image from 'next/image'
import React from 'react'
import { fileURLToPath } from 'url'

import Link from 'next/link'
import { Media } from '@/payload-types'
import LogoutButton from '@/components/LogoutButton'
import { getUser } from '@/utils/get-user'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  // get user if exists
  const { user, payload } = await getUser()
  if (!user) {
    redirect('/login')
  }

  // const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  const todos = await payload?.find({
    collection: 'todos',
    limit: 100,
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: 20 }}>
      <h2>Payload To Do List {user?.email}</h2>
      <div className="todos">
        <Link href="/todo-create">
          <button
            style={{
              border: '1px solid #ccc',
              borderRadius: 10,
              padding: 10,
              marginBottom: 16,
            }}
          >
            Create Todo
          </button>
          <LogoutButton />
        </Link>
        {todos.docs.map((todo) => (
          <Link href={`/todos/${todo.id}`} key={todo.id} style={{ textDecoration: 'none' }}>
            <div
              style={{
                display: 'flex',
                border: '1px solid #ccc',
                borderRadius: 10,
                marginBottom: 16,
              }}
            >
              {todo.media ? (
                <div style={{ width: 100, height: 100, margin: 16, marginTop: 20 }}>
                  <Image
                    src={`${(todo.media as Media)?.url}`}
                    alt={todo.title}
                    width={100}
                    height={100}
                  />
                </div>
              ) : (
                <div style={{ width: 100, height: 100, margin: 16, marginTop: 20 }}>
                  <p>No media</p>
                </div>
              )}
              <div style={{ paddingBottom: 16, paddingLeft: 16 }}>
                <h2>{todo.title}</h2>
                <p>{todo.description}</p>
                <p>{todo.completed ? 'Completed' : 'Not Completed'}</p>
                <p>{todo.createdAt}</p>
                <p>{todo.updatedAt}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
