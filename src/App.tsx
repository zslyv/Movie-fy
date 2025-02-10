import Search from "./components/search.tsx"
import { useState } from "react";

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <main>
      <div className='pattern'/>
      <div className='wrapper'/>
      <header>
        <h1 className='text-gradient'>Gradient title woah</h1>
      </header>
      {/* This is a component, this is very similar to angular in the aspect of getting the component from another component folder, and calling it here (needs to be imported) */}
      {/* This here is a prop and are used to comunicate between files */}
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </main>
  )
}

export default App