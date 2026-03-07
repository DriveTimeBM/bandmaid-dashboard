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
  
 // lib/fetchData.js
 export async function fetchSetlists() {
    try {
      const res = await fetch('https://raw.githubusercontent.com/DriveTimeBM/BAND-MAID_okyuji/main/setlists.json');
      const rawText = await res.text();
      console.log("Raw setlists response:", rawText); // Log the raw text
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = JSON.parse(rawText);
      if (!Array.isArray(data)) {
        throw new Error("Setlists data is not an array");
      }
      return data;
    } catch (error) {
      console.error("Failed to fetch setlists:", error);
      return []; // Return empty array on error
    }
  }
  
    
