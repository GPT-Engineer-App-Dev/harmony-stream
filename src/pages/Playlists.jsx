import { useState } from "react";
import { Container, Heading, VStack, Input, Button, List, ListItem, Text } from "@chakra-ui/react";

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [newSong, setNewSong] = useState("");

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
                      </ListItem>
                    ))}
                  </List>
                </VStack>
              )}
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Playlists;