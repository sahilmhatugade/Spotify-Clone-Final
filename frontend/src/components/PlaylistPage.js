import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // Use this to access passed state

const PlaylistPage = () => {
  const location = useLocation(); // Get state passed from Dashboard
  const { playlist } = location.state || {}; // Access the playlist data
  const [currentTrack, setCurrentTrack] = useState(null); // Track to play

  if (!playlist) return <p>Loading...</p>;

  return (
    <div className="p-6 w-full min-h-screen bg-gray-900 text-white">
      <h2 className="text-xl font-bold mb-4">{playlist.name} - Tracks</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {playlist.tracks.length > 0 ? (
          playlist.tracks.map((track) => (
            <div
              key={track.id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg"
            >
              <div className="relative">
                <img
                  src={track.album?.cover || "https://via.placeholder.com/150"}
                  alt={track.title}
                  className="w-full h-32 rounded mb-2"
                />
                <h6 className="text-sm font-medium">{track.title}</h6>
                <p className="text-xs text-gray-400">
                  Artist: {track.artist?.name || "Unknown Artist"}
                </p>
                <button
                  className="absolute top-2 right-2 text-white bg-gray-800 rounded-full px-2"
                  onClick={() => setCurrentTrack(track.preview)}
                >
                  Play
                </button>
              </div>

              {/* Play the track if it's the current track */}
              {currentTrack === track.preview && (
                <div className="mt-4">
                  <audio controls className="w-full">
                    <source src={track.preview} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No tracks in this playlist.</p>
        )}
      </div>
    </div>
  );
};

export default PlaylistPage;
