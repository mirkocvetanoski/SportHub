import { Box, Flex, Text } from '@chakra-ui/react';
import { IoChevronForward, IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';

import { Switch } from '@/components/ui/switch';

const SettingsBox = ({ settingsRef, darkMode, setDarkMode }) => {
  return (
    <Box
      ref={settingsRef}
      position="absolute"
      top="50px"
      right="0px"
      border="1px solid"
      borderColor="border.emphasized"
      borderRadius={10}
      width="250px"
      padding={2}
      bg="gray.focusRing"
    >
      <Flex
        alignItems="center"
        gap={2}
        paddingX={1}
        paddingY={1}
        cursor="pointer"
        borderRadius="inherit"
        _hover={{ bg: 'gray.600' }}
      >
        <IoSettingsOutline aria-label="Settings" />

        <Text fontWeight="light" fontSize="smaller">
          Settings
        </Text>

        <Box marginLeft="auto">
          <IoChevronForward aria-label="Arrow right" size={18} />
        </Box>
      </Flex>

      <Flex
        alignItems="center"
        bg="gray.focusRing"
        gap={2}
        paddingX={1}
        paddingY={1}
        borderRadius="inherit"
        marginTop={1}
        cursor="pointer"
        _hover={{ bg: 'gray.600' }}
      >
        {darkMode ? (
          <MdOutlineDarkMode aria-label="Mode" />
        ) : (
          <MdOutlineLightMode aria-label="Mode" />
        )}

        <Text fontWeight="light" fontSize="smaller">
          Mode
        </Text>

        <Box marginLeft="auto">
          <Switch
            size="sm"
            variant="raised"
            colorPalette="green"
            defaultChecked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default SettingsBox;
