import { fetchSongs, fetchStreamingLinks, fetchYouTube } from '../../lib/fetchData';

// 1. Define which paths to pre-render at build time
export async function getStaticPaths() {
  const songs = await fetchSongs();
  const paths = songs.map((song) => ({
    params: { name: song.Name },
  }));
  return {
    paths,
    fallback: false,
  };
}

// 2. Fetch data for each song at build time
export async function getStaticProps({ params }) {
  const [songs, streamingLinks, youtube,setlists] = await Promise.all([
    fetchSongs(),
    fetchStreamingLinks(),
    fetchYouTube(),
  ]);
  const song = songs.find((s) => s.Name === params.name);
  const links = streamingLinks.filter((link) => link.Song === params.name);
  const videos = youtube.filter((video) => video.Song === params.name);
  return { props: { song, links, videos } };
}

// 3. Your page component
// *************
import { useState, useEffect } from 'react';

export default function SongDetail({ song, links, videos }) {
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!song) return <div>Song not found</div>;

  // Fetch setlists client-side
  useEffect(() => {
    const fetchSetlists = async () => {
      try {
        const data = await fetchSetlists();
        const filteredSets = data.filter((set) => set.Song === song.Name);
        setSets(filteredSets);
      } catch (err) {
        console.error("Failed to fetch setlists:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSetlists();
  }, [song.Name]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1>{song.Name}</h1>
      <p><strong>Album:</strong> {song.Album}</p>
      <p><strong>Release Date:</strong> {song.ReleaseDate ? new Date(song.ReleaseDate).toLocaleDateString() : 'Unknown'}</p>
      <p><strong>Played Live:</strong> {song.PlayedLiveCount ? song.PlayedLiveCount.toLocaleString() : 'Unknown'} times</p>
      <p><strong>Spotify Streams:</strong> {song.SpotifyStreams ? song.SpotifyStreams.toLocaleString() : 'Unknown'}</p>
      {song.MediaTieIn && <p><strong>Media Tie-In:</strong> {song.MediaTieIn}</p>}

      <h2>Streaming Links</h2>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.URL} target="_blank" rel="noopener noreferrer">
              {link.Service} ({link.Streams ? link.Streams.toLocaleString() : 'Unknown'} streams)
            </a>
          </li>
        ))}
      </ul>

      <h2>YouTube Videos</h2>
      <ul>
        {videos.map((video, index) => (
          <li key={index}>
            <a href={video.URL} target="_blank" rel="noopener noreferrer">
              {video.Title} ({video.Views ? video.Views.toLocaleString() : 'Unknown'} views)
            </a>
          </li>
        ))}
      </ul>

      <h2>Okyuji (Setlists)</h2>
      {loading ? (
        <p>Loading setlists...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>Failed to load setlists: {error}</p>
      ) : (
        <ul>
          {sets.map((set, index) => (
            <li key={index}>
              {set.Date} - {set.Venue}, {set.City}, {set.Country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
