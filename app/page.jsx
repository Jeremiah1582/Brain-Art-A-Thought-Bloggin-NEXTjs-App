import Feed from './components/Feed'

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      {/* <div>Home</div> */}
      <h1 className='head_text text-center'>
        discover & share
        <br className="max-md:hidden" />
        <span className="purple_gradient"> Whats on your mind</span>
      </h1>
      <p className="desc text-center">A blogging platform for people that want to share a short burst of creativity</p>
{/* feed */}

<Feed/>

      
    </section>
 
  )
}

export default Home