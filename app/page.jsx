import Feed from './components/Feed'

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      {/* <div>Home</div> */}
      <h1 className='head_text text-center'>
        discover & share
        <br className="max-md:hidden" />
        <span className="orange_gradient"> AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">PromptShare is a platform where you can search share and save all your favourite AI prompts</p>
{/* feed */}

<Feed/>

      
    </section>
 
  )
}

export default Home