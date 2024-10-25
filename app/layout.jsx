
import Nav from "./components/Nav";
import Provider from "./components/Provider";
import "./styles/globals.css";

export const metadata = {
  title: "Brain Art",
  description: "Online open Blogging platform where you can Discover and share your creative thoughts ",

  openGraph: {
    title: 'Brain Art",',
    description: 'Discover and share your creative thoughts using the Brain Art Blog',
    type: 'website',
    url: 'https://www.brainart.co.uk',
    images: [
      {
        url: '/app/public/assets/images/logo.png',
        width: 800,
        height: 330,
        alt: 'Brain Art Logo',
      },
    ],
    locale: 'en_GB', // Specify the locale
    site_name: 'Brain Art', // Name of your site
  },

  robots: {
    index: true,
    follow: true,
  },
  
  charset: 'utf-8',
  keywords: 'Write, creative writing, blog, share thoughts, forum for thoughts, remove writers block, poems, novels', // Add relevant keywords
  author: 'Brain Art', // Author or company name
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
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
