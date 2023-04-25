import axios from "axios";
import {useRef, useState} from "react"
import { youtube_parser } from "./youtube";


function App()
{
  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);


  const handleSubmit = (e)=>
  {
    e.preventDefault()
   
    const youtubeID = youtube_parser(inputUrlRef.current.value);
    console.log(youtubeID)

    const options ={
       method: 'GET',
       url:  'https://youtube-mp36.p.rapidapi.com/dl',
       headers: {
        // 'content-type': 'application/octet-stream',
        'X-RapidAPI-Key': 'ea60035f9cmsh600d9e8b72a57e9p1d58b4jsndef474ba8238',
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      },
       params: {
        id : youtubeID
       }
    }
    axios(options)
    .then(res => setUrlResult(res.data.link))
    .catch(err => console.log(err))

    inputUrlRef.current.value = '';
  }
  return (
    <>
      <div className='app'>
        <span className="logo">Youtube2mp3</span>
        <section className="content">
          <h1 className="content_title">Youtube to MP3 Converter</h1>
          <p className="content_description">
            Transform Youtube video into mp3 in just a few clicks!
          </p>

          <form onSubmit={handleSubmit} className="form">
            <input ref={inputUrlRef} placeholder="Paste Your Youtube Video Url Link..." 
            className="form_input" type="text" />
            <button type="submit" className="form_button">Search</button>
          </form>

          {urlResult ?  <a  target="_blank" rel="noreferrer" href={urlResult} className="download_btn">Download MP3</a> : ''}
         
        </section>
      </div>
    </>
  )
}

export default App
