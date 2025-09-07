import { createContext, useReducer} from "react"

export const Music = createContext(
    {
        songList: [],
        history : [],
    playSong: () => {},
    }
    
)
const SongProvider = ({children}) =>
{
    const initialState = {
  artist_image: "",
  song_name: "",
  artist_name: "",
  url: "",
  history: [],
};

 const reducer = (currSong,action) =>
    {
        let songList = [];
        if(action.type === "PLAY_SONG")
        {

            songList = [...(currSong.history || []),action.payload]
            return{ artist_image : action.payload.artist_image,
                song_name : action.payload.song_name,
                artist_name: action.payload.artist_name,
                url: action.payload.url,
               history:songList
          };
        }
        else{
               return currSong;
        }
     
    }


const [currentSong, dispatchSong] = useReducer(reducer,initialState);
const playSong = (artist_image,song_name,artist_name,url) =>{
    console.log("play song called");
    dispatchSong({
        type : "PLAY_SONG",
        payload: {
            artist_image,
            song_name,
            artist_name,
            url
        },
    });

    console.log(`New Song added ${artist_image},${song_name},${artist_name} ${url}`);
};


return (
    <Music.Provider value = {{currentSong,playSong,history:currentSong.history 
    }}>{children}</Music.Provider>
);

};

export default SongProvider;