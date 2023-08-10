import '@styles/layout.scss'

export const metadata ={
    title: "Prompted_Search",
    description: "discover and share ai prompts"
}


const layout = () => {
  return (
    <html>
        <body>
            <div className="main">
                <div className="gradient">

                </div>
                <main className="app">
                    {children}
                </main>
            </div>
        </body>
    </html>
  )
}

export default layout