import { createContext, useState, useEffect } from "react";

// AuthContext for handling authentication state
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = (newToken, userDetails) => {
    setToken(newToken);
    setUser(userDetails);
    localStorage.setItem("authToken", newToken);
    localStorage.setItem("user", JSON.stringify(userDetails));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("user");
  
    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser)); // Only parse if savedUser is not undefined or invalid
      } catch (error) {
        console.error("Error parsing saved user data: ", error);
        // Optionally handle the error, e.g., reset to default or show a message to the user
      }
    }
  }, []);
  

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// MusicContext for handling music-related state
export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [resultOffset, setResultOffset] = useState(0);
  const [musicResults, setMusicResults] = useState([]); // New state for music search results
  const [currentTrack, setCurrentTrack] = useState(null); // Track currently being played or viewed

  const resetMusicResults = () => {
    setMusicResults([]);
    setResultOffset(0);
  };

  return (
    <MusicContext.Provider
      value={{
        isLoading,
        setIsLoading,
        resultOffset,
        setResultOffset,
        musicResults,
        setMusicResults,
        currentTrack,
        setCurrentTrack,
        resetMusicResults,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

// Combined ContextProvider to wrap the whole app
export const CombinedProvider = ({ children }) => {
  return (
    <AuthProvider>
      <MusicProvider>{children}</MusicProvider>
    </AuthProvider>
  );
};
