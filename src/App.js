import './App.scss';
import img from './img/wiki-logo.png'
import {useState,useRef} from 'react'

function App() {
  const [data,setData] = useState([])
  const inputRef = useRef()

  const handleClickSearchBtn = async() => {
    const url = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';
    try{
      const response = await fetch(`${url}${inputRef.current.value}`);
      const data = await response.json();
      const results = data.query.search;
      if (results.length < 1) 
        return;
      setData(results)
    } catch (error) {}
  }

  return (
    <div className="App">
      <div className='img'>
        <img src={img} alt='ptc' />
      </div>

      <p className='header'>Search Wikipedia</p>
      <div className='input'>
        <input ref={inputRef} type='text' className='inputItem' />
        <button className='searchBtn' onClick={handleClickSearchBtn}>Search</button>
      </div>

      <div className='results'>
        {
          data.map((item,index) => {
            const {title,snippet,pageid} = item;
            let list = snippet.toLowerCase().split(`<span class="searchmatch">${inputRef.current.value.toLowerCase()}</span>`)
            console.log(list)
            return (<a target='__blank' href={`http://en.wikipedia.org/?curid=${pageid}`} className='resultLink' key={index}>
                      <div className='result'>
                        <h3 className='resultHeader'>{title}</h3>
                        <p className='resultText'>{list}</p>
                      </div>
                    </a>)
        })
        }


      </div>
    </div>
  );
}

export default App;
