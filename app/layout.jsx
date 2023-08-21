
import Nav from "./components/Nav";
import Provider from "./components/Provider";
import "./styles/globals.css";

export const metadata = {
  title: "Brain Art",
  description: " A blog where you can discover and share your creative thoughts",
};

const RootLayout = ({ children }) => {
 
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"/>
            </div>
            <main className="app">
              <Nav />
              {children}
            </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
