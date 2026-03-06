// Import your data-fetching utilities
import { fetchSongs, fetchStreamingLinks, fetchYouTube } from '../../lib/fetchData';

// 1. Define which paths to pre-render at build time
export async function getStaticPaths() {
  const songs = await fetchSongs();
  const paths = songs.map((song) => ({
    params: { name: song.Name },
  }));
  return {
    paths,
    fallback: false, // or 'blocking' if you want to generate missing pages on demand
  };
}

// 2. Fetch data for each song at build time
export async function getStaticProps({ params }) {
  const [songs, streamingLinks, youtube] = await Promise.all([
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
export default function SongDetail({ song, links, videos }) {
  if (!song) return <div>Song not found</div>;

  return (
    <div>
      <h1>{song.Name}</h1>
      <p>Album: {song.Album}</p>
      <p>Release Date: {song.ReleaseDate}</p>
      <p>Played Live: {song.PlayedLiveCount} times</p>
      <p>Spotify Streams: {song.SpotifyStreams}</p>

      <h2>Streaming Links</h2>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.URL} target="_blank" rel="noopener noreferrer">
              {link.Service} ({link.Streams} streams)
            </a>
          </li>
        ))}
      </ul>

      <h2>YouTube Videos</h2>
      <ul>
        {videos.map((video, index) => (
          <li key={index}>
            <a href={video.URL} target="_blank" rel="noopener noreferrer">
              {video.Title} ({video.Views} views)
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
