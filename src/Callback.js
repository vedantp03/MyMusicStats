import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import "./artists.css"
import "./callback.css"
import spotifyIcon from "./spotify_icon_black.png"

const Main = () => {
    const [formattedTracks, setFormattedTracks] = useState([]);
    const [formattedPics, setFormattedPics] = useState([])
    const [urls, setUrls] = useState([])
    const [genre, setGenre] = useState([])
    const [timeFrame, setTimeFrame] = useState("(Last Month)")

    const short_term = 'v1/me/top/tracks?time_range=short_term&limit=50'
    const med_term = 'v1/me/top/tracks?time_range=medium_term&limit=50'
    const long_term = 'v1/me/top/tracks?time_range=long_term&limit=50'
    
    const [timeRange, setTimeRange] = useState(short_term)

    const displayAuth = () => {
        let local = String(window.location.href)
        local = local.split("#")[1]
        local = local.split("=")[1]
        local = local.split("&")[0]
        return local
      }
      
      const token = displayAuth()
      async function fetchWebApi(endpoint, method, body) {
      const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method,
        body:JSON.stringify(body)
      });
      return await res.json();
    }
    
    async function getTopTracks(){
      const topTracksResponse = await fetchWebApi(
        timeRange,
        'GET'
      );
    
      if (!topTracksResponse.items || topTracksResponse.items.length === 0) {
        return []; // Return an empty array when there are no top tracks
      }
    
      return topTracksResponse.items;
    }

    function getTimeFrame() {
      if (timeRange == short_term) {
        setTimeFrame("(Last Month)")
      } else if (timeRange == med_term) {
        setTimeFrame("(Last 6 Months)")
      } else {
        setTimeFrame("(All Time)")
      }
    }

    const displayTopTracks = async () => {
      try {
        const topTracks = await getTopTracks();
        let pics = [];
        let temp_urls = []
        let temp_genre = []
        console.log(topTracks)
        for (let n = 0; n < topTracks.length; n++) {
          pics.push(topTracks[n]["album"]["images"][0]["url"])
          temp_urls.push(topTracks[n].album.external_urls.spotify)
        }
        const tracks = topTracks?.map(({ name, artists }) => `${name} by ${artists.map(artist => artist.name).join(', ')}`);
        setFormattedPics(pics)
        setFormattedTracks(tracks);
        setUrls(temp_urls);
      } catch (error) {
        console.error("Error fetching top tracks:", error);
      }
    }

    useEffect(() => {
      getTimeFrame();
    }, [timeRange]);

    useEffect(() => {
      displayTopTracks();
    }, [timeRange]);

    return (
      <div>
      <div className="navBar">
        <Link to={"/artists" + window.location.hash}>Get Top Artists</Link>
        <button onClick={() => setTimeRange(short_term)}>Last Month</button>
        <button onClick={() => setTimeRange(med_term)}>Last 6 Months</button>
        <button onClick={() => setTimeRange(long_term)}>All Time</button>
      </div>
      <h1 className="header">Your Top Songs {timeFrame}</h1>
      <ol id="myList">
        {formattedTracks.map((element, index) => (
          <li className="listElement" key={index}>
            {formattedPics[index] && ( // Check if the image exists before rendering
              <img className="artistImage" src={formattedPics[index]} alt={element} />
            )}
            {element}
            <div className="buttonContainer">
            {urls[index] && ( // Check if the URL exists before rendering
              <a className="linkButton" href={urls[index]} target="_blank" rel="noopener noreferrer">
                <button><img className="spotifyIcon2" src={spotifyIcon} title="Open this icon to view the Album"/></button>
              </a>
            )}
            </div>
          </li>
        ))}
      </ol>
    </div>
    )
}

export default Main;