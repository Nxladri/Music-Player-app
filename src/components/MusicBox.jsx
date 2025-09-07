import { useContext, useState } from "react";
import { Music } from "../store/SongProvider";
import { toast } from "react-toastify";

const MusicBox = () => {

  const [song, setSong] = useState("");

  const {currentSong,playSong} = useContext(Music);
 
  const handleOnClick = async () => {

    if(song.trim() === "")
    {
        alert("Please enter a song name");
        return;
    }
    const apiKey = import.meta.env.VITE_YT_API_KEY;
    console.log("API Key is",apiKey);
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${song}music&type=video&videoCategoryId=10&maxResults=5&key=${apiKey}`;
;
    try{
      const response = await fetch(url);
      const data = await response.json();
      if(data.items && data.items.length > 0){
        const result = data.items[0];
        const videoId = result.id.videoId;
        const artist_image = result.snippet.thumbnails.high.url;
        const song_name = result.snippet.title;
        const artist_name = result.snippet.channelTitle;
        playSong(artist_image,song_name,artist_name,videoId);
        toast.success("Song has been played successfully",{className : 'toast-success',
                position:"top-center",
                autoClose :6000,
            });
        console.log("Song played successfully");
      }

    }catch(error)
    {
      alert("Error fetching song. Please try again later.");
      console.log("Error fetching song",error);
    }
    }

   const handleEnterKey = (event) =>
  {
    if(event.key === "Enter")
    {
      console.log("Enter key pressed");
      handleOnClick();
    }
  }

  const handleonChange = (event) =>{
    setSong(event.target.value);
    console.log("Song has been changed",event.target.value);
  }

  return (
<div>
   <div className="input-container">
    <input type="text" 
    className="input-box"
    placeholder="Search a song"
    value={song}
     onChange={handleonChange}
       onKeyDown={handleEnterKey}/>
        <button type="button" className="btn btn-info info"
        onClick={handleOnClick}
        >Search</button>
        </div>
    <div 
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh" // center vertically and horizontally
      }}
    >
      <div 
        className="card text-center" 
        style={{
          width: "600px",     // equal width & height for circle
          height: "600px",
          borderRadius: "50%", // makes it circular
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
        }}
      >
        { currentSong?.artist_image && (
          <img 
          src={currentSong.artist_image}
          alt ={currentSong.artist_name}
          style={{ borderRadius: "50%", width: "100px", height: "100px", marginBottom: "20px" }}
          />
        )}
   <h5 className="card-title" style={{textAlign: "center",wordWrap:"break-word", maxWidth: "180px"}}>{currentSong?.artist_name || "Nothing is Playing"}</h5> 
<p className="card-text"  style={{textAlign: "center",wordWrap:"break-word"}}>{currentSong?.song_name || "Choose your own"}</p>  


{currentSong?.url && (
          <iframe
              width="400"
              height="500"
              src={`https://www.youtube.com/embed/${currentSong.url}?autoplay=1`}
              title={currentSong.song_name}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ marginTop: "20px",
                borderRadius: "50%" 
              }}
            ></iframe>
)}

        {/* <a href="#" className="btn btn-primary btn-sm">Song name</a> */}
      </div>
    </div>
    </div>
  );
};

export default MusicBox;
