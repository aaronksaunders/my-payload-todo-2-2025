'use client'
import { useRouter } from 'next/navigation'

const LogoutButton = () => {
  const router = useRouter()

  const handleLogout = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookie handling
    })

    if (!response.ok) {
      alert('Logout failed')
      return
    }

    const result = await response.json()
    console.log('logout result', result)

    router.refresh()
    router.push('/login')
  }
  return (
    <button
      style={{
        border: '1px solid #ccc',
        borderRadius: 10,
        padding: 10,
        marginBottom: 16,
        marginLeft: 16,
      }}
      onClick={handleLogout}
    >
      Logout
    </button>
  )
}

export default LogoutButton
