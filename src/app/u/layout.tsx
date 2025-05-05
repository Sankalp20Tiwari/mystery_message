export const metadata = {
  title: 'Mystery Message',
  description: 'Send and receive messages anonymously—connect, express, and share secrets without revealing your identity!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <div>
        {children}
        </div>
  )
}
