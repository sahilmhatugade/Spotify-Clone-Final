import React from "react";

const Artist = ({ artist }) => {
  return (
    <div className="flex flex-col items-center text-center bg-gray-800 p-4 rounded shadow-md hover:shadow-lg transition-shadow duration-200">
      {artist ? (
        <>
          <img
            src={artist.picture || "https://via.placeholder.com/150"}
            alt={artist.name || "Unknown Artist"}
            className="w-32 h-32 object-cover rounded-full mb-3"
          />
          <h6 className="text-lg font-semibold text-gray-200">
            {artist.name || "Unknown Artist"}
          </h6>
          <p className="text-sm text-gray-500">
            Followers: {artist.nb_fan?.toLocaleString() || "N/A"}
          </p>
        </>
      ) : (
        <div className="text-center">
          <p className="text-gray-500">No Artist Data Available</p>
        </div>
      )}
    </div>
  );
};

export default Artist;
