
import { useContext } from "react"
import { Music } from "../store/SongProvider";

const History = () =>
{

    const {history,playSong} = useContext(Music);
    console.log("History component called",history);
    return (
        <div>
                <div className="history-drawer">
                <h3>History</h3>
        {/* <div className="card container"> */}
         <div className="history-list">
            {Array.isArray(history) && history.length > 0 ? (
                history.map((item,index) => 
                    <ul key={index}
                    
                    style={{ cursor: "pointer", color: "blue" }}
                    onClick = {() => playSong(item.artist_image,item.song_name,item.artist_name,item.url)}
                    >
                        <li>
                            {item.song_name} by {item.artist_name}
                        </li>
                        </ul>
                )
            ) :(<p>No history available. Start playing some music!</p>)
        }
         </div>
        </div>
        </div>
        // </div>
    );
}
export default History;