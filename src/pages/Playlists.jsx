import { useState, useEffect, useRef } from "react";
import { Container, Heading, VStack, Input, Button, List, ListItem, Text } from "@chakra-ui/react";

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [newSong, setNewSong] = useState("");
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentSong]);

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim() !== "") {
      setPlaylists([...playlists, { name: newPlaylistName, songs: [] }]);
      setNewPlaylistName("");
    }
  };

  const handleAddSong = () => {
    if (newSong.trim() !== "" && selectedPlaylist !== null) {
      const updatedPlaylists = playlists.map((playlist, index) => {
        if (index === selectedPlaylist) {
          return { ...playlist, songs: [...playlist.songs, newSong] };
        }
        return playlist;
      });
      setPlaylists(updatedPlaylists);
      setNewSong("");
    }
  };

  const handlePlaySong = (song) => {
    setCurrentSong(song);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleResume = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handleTogglePlayback = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handleResume();
    }
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <Heading as="h2" size="xl">Create a Playlist</Heading>
        <Input
          placeholder="Playlist Name"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
        />
        <Button onClick={handleCreatePlaylist} colorScheme="teal">Create Playlist</Button>

        <Heading as="h3" size="lg" mt={8}>Your Playlists</Heading>
        <List spacing={3} width="100%">
          {playlists.map((playlist, index) => (
            <ListItem key={index} onClick={() => setSelectedPlaylist(index)} cursor="pointer">
              <Text fontSize="xl">{playlist.name}</Text>
              {selectedPlaylist === index && (
                <VStack spacing={2} mt={2}>
                  <Input
                    placeholder="Add a song"
                    value={newSong}
                    onChange={(e) => setNewSong(e.target.value)}
                  />
                  <Button onClick={handleAddSong} colorScheme="teal">Add Song</Button>
                  <List spacing={1} width="100%">
                    {playlist.songs.map((song, songIndex) => (
                      <ListItem key={songIndex}>
                        <Text>{song}</Text>
                        <Button onClick={() => handlePlaySong(song)} colorScheme="teal" size="sm" mt={2}>
                          Play
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </VStack>
              )}
            </ListItem>
          ))}
        </List>
        {currentSong && (
          <VStack spacing={2} mt={4}>
            <Text>Now Playing: {currentSong}</Text>
            <Button onClick={handleTogglePlayback} colorScheme="teal" size="sm">
              {isPlaying ? "Pause" : "Resume"}
            </Button>
          </VStack>
        )}
      </VStack>
      <audio ref={audioRef} />
    </Container>
  );
};

export default Playlists;