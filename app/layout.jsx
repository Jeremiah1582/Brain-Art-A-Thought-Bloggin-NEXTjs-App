
import Navbar from './components/Navbar'
import Provider from './components/Provider'
import './styles/globals.css'

export const metadata ={
    title: "Prompted_Search",
    description: "discover and share ai prompts"
}


const RootLayout = ({children}) => {
  return (
    <html>
        <body>
            <Provider>
            <div className="main">
                <div className="gradient"/>
                <main className="app">
                <Navbar />
                    {children}
                    
                </main>
            </div>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout