export async function fetchSongs() {
    const res = await fetch('https://raw.githubusercontent.com/DriveTimeBM/BAND-MAID_songs/main/songs.json');
    return res.json();
  }
  
  export async function fetchStreamingLinks() {
    const res = await fetch('https://raw.githubusercontent.com/DriveTimeBM/BAND-MAID_gpt/main/songs/streaming_links.json');
    return res.json();
  }
  
  export async function fetchYouTube() {
    const res = await fetch('https://raw.githubusercontent.com/DriveTimeBM/BAND-MAID_gpt/main/youtube/youtube.json');
    return res.json();
  }
  
  export async function fetchSetlists() {
    const res = await fetch('https://raw.githubusercontent.com/DriveTimeBM/BAND-MAID_gpt/main/setlists.json');
    const rawText = await res.text(); // Read as text first
    console.log("Raw JSON text:", rawText); // Log the raw text
    try {
      return JSON.parse(rawText); // Try to parse
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      throw e;
    }
  }
  
  