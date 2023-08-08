import React, { useEffect, useState } from 'react';

function generateRandomString(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

const Home = () => {
  const [client_id] = useState("06125600bf644562a232f5dbcf2d6ac2");
  const [redirect_uri, setRedirectUri] = useState("http://localhost:3000/callback");
  const [scope] = useState("user-top-read playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative");
  const [state, setState] = useState(generateRandomString(16));

  const prod = "production"

  useEffect(() => {
    const body = document.querySelector("body");

    // Set the redirect_uri based on the environment
    if (prod === 'production') {
      setRedirectUri('https://mywrappeddata.netlify.app/callback');
    } else {
      setRedirectUri('http://localhost:3000/callback');
    }
  }, []);

  const handleAuthClick = (event) => {
    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);

    event.preventDefault();
    window.location = url;
  }

  return (
    <div className='App'>
      <div className="contentBox">
        <p>YOUR</p>
        <h1>Stats</h1>
        <button className="loginBtn" onClick={handleAuthClick}>Login with Spotify</button>
        </div>
    </div>
  );
}

export default Home;