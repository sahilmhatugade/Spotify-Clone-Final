import React from "react";

const Track = ({ track }) => {
  if (!track) {
    return (
      <div className="text-center">
        <p>No Track Data Available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-lg h-full">
      <img
        src={track.album?.cover || "https://via.placeholder.com/150"}
        alt={track.title || "Unknown Track"}
        className="w-24 h-24 rounded mb-4"
      />
      <h6 className="text-sm font-medium text-white text-center">
        {track.title || "Unknown Track"}
      </h6>
      <p className="text-xs text-gray-400 text-center mb-4">
        Artist: {track.artist?.name || "Unknown Artist"}
      </p>
      {track.preview ? (
        <audio controls className="mt-auto w-full">
          <source src={track.preview} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      ) : (
        <p className="text-xs text-gray-400 mt-auto">Preview not available</p>
      )}
    </div>
  );
};

export default Track;
