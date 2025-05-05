import FooterSection from "@/components/FooterSection"
import Navbar from "@/components/Navbar"

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
    <>
      <Navbar />
        {children}
      <FooterSection />
    </>
  )
}
