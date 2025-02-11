'use client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
      alert('Email and password are required')
      return
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include', // Important for cookie handling
    })

    if (!response.ok) {
      alert('Login failed')
      return
    }

    const result = await response.json()
    console.log('login result', result)

    router.refresh()
    router.push('/')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: 20 }}>
      <h2>Login</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 20,
          width: '66%',
          margin: 'auto',
        }}
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 16 }}>
            <label>Email</label>
            <input type="email" name="email" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 16 }}>
            <label>Password</label>
            <input type="password" name="password" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 16 }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}
