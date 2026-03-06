import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { fetchSongs } from '../lib/fetchData';

export async function getStaticProps() {
  const songs = await fetchSongs();
  return {
    props: {
      songs,
    },
  };
}

export default function Home({ songs }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSongs = songs.filter((song) =>
    song.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.Album.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <Head>
        <title>BAND-MAID Song Dashboard</title>
        <meta name="description" content="Browse BAND-MAID songs, stats, and streaming links" />
      </Head>

      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>BAND-MAID Songs</h1>

      {/* Search Bar */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search by song name or album..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '8px', width: '300px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      {/* Song List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredSongs.map((song, index) => (
          <div key={index} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
            <h2 style={{ marginTop: 0 }}>
              <Link href={`/songs/${encodeURIComponent(song.Name)}`} legacyBehavior>
                <a style={{ color: '#333', textDecoration: 'none' }}>{song.Name}</a>
              </Link>
            </h2>
            <p><strong>Album:</strong> {song.Album}</p>
            <p><strong>Release Date:</strong> {song.ReleaseDate ? new Date(song.ReleaseDate).toLocaleDateString() : 'Unknown'}</p>
            <p><strong>Played Live:</strong> {song.PlayedLiveCount ? song.PlayedLiveCount.toLocaleString() : 'Unknown'} times</p>
            <p><strong>Spotify Streams:</strong> {song.SpotifyStreams ? song.SpotifyStreams.toLocaleString() : 'Unknown'}</p>
            {song.MediaTieIn && <p><strong>Media Tie-In:</strong> {song.MediaTieIn}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
