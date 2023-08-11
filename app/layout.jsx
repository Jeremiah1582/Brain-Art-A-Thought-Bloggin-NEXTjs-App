import './styles/globals.css'
import Navbar from './components/Navbar'
import Provider from './components/Provider'

export const metadata ={
    title: "Prompted_Search",
    description: "discover and share ai prompts"
}


const RootLayout = ({children}) => {
  return (
    <html>
        <body>
            <div className="main">
                <div className="gradient"/>
                <main className="app">
                <Navbar />
                    {children}
                    
                </main>
            </div>
        </body>
    </html>
  )
}

export default RootLayout