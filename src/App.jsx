import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header'
import MusicBox from './components/MusicBox'
import SongProvider from './store/SongProvider';
import History from './components/History';
import { useState } from 'react';
function App() {

  const [showHistory,setShowHistory] = useState(false);

  const handleOnClick = () =>
  {
    setShowHistory(!showHistory);
  }
  return (
    <div>
      <SongProvider>
    <Header />
    {/* <button onClick ={() => setShowHistory(!showHistory)}>
      {showHistory? "Hide History":"Show History"}
    </button>
    {showHistory && <History/>} */}

    <button type="button" class="btn btn-dark hide"
   onClick={handleOnClick} >   {showHistory? "Hide History":"Show History"}</button>
   {showHistory && <History/>}
    
    <MusicBox/>
       <ToastContainer position='top-right' autoClose = {3000}/> 
      </SongProvider>
    </div>
  )
}

export default App
