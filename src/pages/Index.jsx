import { Container, Text, VStack, Box, Heading, Button, Image } from "@chakra-ui/react";
import { useState } from "react";

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="2xl" mb={4}>Music Streaming Service</Heading>
        <Text fontSize="lg">Stream your favorite music anytime, anywhere.</Text>
        <Box boxSize="sm" mt={6}>
          <Image src="/images/music-streaming.jpg" alt="Music Streaming" />
        </Box>
        <Button onClick={handlePlayPause} colorScheme="teal" size="lg" mt={6}>
          {isPlaying ? "Pause" : "Play"}
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;