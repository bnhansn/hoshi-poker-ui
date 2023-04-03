import '@/styles/global.css'
import { AppContainer } from './components/AppContainer'
import { AppContext } from './components/AppContext'

export const metadata = {
  title: 'Poker',
  description: 'meta description'
}

export default function RootLayout({
  children
}: {
  children: React.ReactElement
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
      </head>
      <body className="bg-gray-900 text-gray-400">
        <AppContext>
          <AppContainer>{children}</AppContainer>
        </AppContext>
      </body>
    </html>
  )
}
