import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Track from "../components/Track";
import Artist from "../components/Artist";

const Dashboard = ({ searchKeyword }) => {
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [message, setMessage] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const navigate = useNavigate();

  const API_HEADERS = {
    "x-rapidapi-key": "e0b1d5fe2bmsh0ca39ff845aa78fp16581bjsn58597e3ef3e4",
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
  };

  const fetchAPI = async (url) => {
    try {
      const response = await fetch(url, { method: "GET", headers: API_HEADERS });
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      return data;
    } catch (error) {
      console.error("API Fetch Error:", error);
      setMessage("An error occurred. Please try again.");
      return null;
    }
  };

  const fetchTopTracksAndArtists = async (query) => {
    const SEARCH_API_URL = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`;
    const data = await fetchAPI(SEARCH_API_URL);

    if (data?.data) {
      setTracks(data.data.slice(0, 10));
      const uniqueArtists = [
        ...new Map(data.data.map((track) => [track.artist.id, track.artist])).values(),
      ];
      setArtists(uniqueArtists.slice(0, 10));
      setMessage("");
    } else {
      setTracks([]);
      setArtists([]);
      setMessage("No results found.");
    }
  };

  const getRandomQuery = () => {
    const RANDOM_QUERIES = [
      "arjit", "pritam", "atif", "kishor", "shreya", "kk", "alan walker", "rahman", "taylor", "selena"
    ];
    return RANDOM_QUERIES[Math.floor(Math.random() * RANDOM_QUERIES.length)];
  };

  useEffect(() => {
    if (searchKeyword) {
      fetchTopTracksAndArtists(searchKeyword);
    } else {
      const randomQuery = getRandomQuery();
      fetchTopTracksAndArtists(randomQuery);
    }
  }, [searchKeyword]);

  // Create a new playlist
  const handleCreatePlaylist = () => {
    if (!newPlaylistName.trim()) return;
    setPlaylists((prev) => [...prev, { name: newPlaylistName, tracks: [] }]);
    setNewPlaylistName("");
  };

  // Delete a playlist
  const handleDeletePlaylist = (playlistName) => {
    setPlaylists((prev) => prev.filter((playlist) => playlist.name !== playlistName));
    if (selectedPlaylist?.name === playlistName) {
      setSelectedPlaylist(null);
    }
  };

  // Add a track to a selected playlist
  const addToPlaylist = (track, playlistName) => {
    setPlaylists((prev) =>
      prev.map((playlist) =>
        playlist.name === playlistName
          ? { ...playlist, tracks: [...playlist.tracks, track] }
          : playlist
      )
    );
    setShowAddToPlaylist(null); // Close the dropdown
  };

  // Handle playlist click to redirect to a new page
  const handlePlaylistClick = (playlist) => {
    navigate("/playlist", { state: { playlist } });
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <div className="w-1/4 bg-gray-800 p-6">
        <h2 className="text-lg font-bold mb-4">Create Your Playlist</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter playlist name"
            className="p-2 rounded-lg text-black"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
          />
          <button
            className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-700 text-white"
            onClick={handleCreatePlaylist}
          >
            Create Playlist
          </button>
          <h3 className="text-md font-semibold">My Playlists</h3>
          {playlists.length === 0 ? (
            <p className="text-gray-400">No playlists created yet.</p>
          ) : (
            playlists.map((playlist) => (
              <div key={playlist.name} className="bg-gray-700 p-4 rounded-lg cursor-pointer">
                <div className="flex justify-between items-center">
                  <h3
                    className="text-lg font-bold cursor-pointer hover:text-green-400"
                    onClick={() => handlePlaylistClick(playlist)}
                  >
                    {playlist.name}
                  </h3>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeletePlaylist(playlist.name)}
                  >
                    Delete
                  </button>
                </div>
                <p>{playlist.tracks.length} tracks</p>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex-grow p-6">
        {message && <p className="text-red-500 mb-4">{message}</p>}

        <section className="mb-6">
          <h2 className="text-xl font-bold mb-4">Popular Songs</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {tracks.map((track) => (
              <div key={track.id} className="relative">
                <Track track={track} />
                <button
                  className="absolute top-2 right-2 text-white bg-gray-800 rounded-full px-2"
                  onClick={() =>
                    setShowAddToPlaylist((prev) => (prev === track.id ? null : track.id))
                  }
                >
                  ⋮
                </button>
                {showAddToPlaylist === track.id && (
                  <div className="absolute top-8 right-2 bg-gray-700 rounded-lg shadow-lg z-10 p-2">
                    {playlists.length > 0 ? (
                      playlists.map((playlist) => (
                        <button
                          key={playlist.name}
                          className="block w-full text-left px-2 py-1 hover:bg-gray-600"
                          onClick={() => addToPlaylist(track, playlist.name)}
                        >
                          Add to {playlist.name}
                        </button>
                      ))
                    ) : (
                      <p className="px-2 py-1">No playlists available</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Popular Artists</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {artists.map((artist) => (
              <Artist key={artist.id} artist={artist} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
