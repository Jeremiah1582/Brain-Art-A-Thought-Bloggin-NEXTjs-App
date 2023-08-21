'use client'
import Feed from './components/Feed'

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      {/* <div>Home</div> */}
      <h1 className='head_text text-center'>
        Discover & Share
        <br className="max-md:hidden" />
        <span className="purple_gradient"> Creative Thoughts </span>
      </h1>
      <p className="desc text-center">A blogging platform for people who want to share creative thoughts that might inspire something great</p>
{/* feed */}

<Feed/>

      
    </section>
 
  )
}

export default Home