import { Flex, Box } from '@chakra-ui/react';

export const SettingsDetails = () => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="calc(100vh)"
      bg="blackAlpha.600" // Semi-transparent black background
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex="overlay" // Ensures it's above everything
    >
      <Flex fontSize="2xl" fontWeight="bold" color="white">
        I am above everything!
      </Flex>
    </Box>
  );
};
