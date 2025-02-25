
const Search = ({searchTerm, setSearchTerm}) => {
  return (
    // You should never modify the set property or you'll brak the rules of react, nor here or main app
    <div className='search'>
      <div>
        {/* e -> means event */}
        <input type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
    </div>
  )
}

export default Search