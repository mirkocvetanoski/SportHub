'use client';

import { Box, Flex, Text } from '@chakra-ui/react';
import { IoChevronForward, IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { useColorMode } from '@/components/ui/color-mode';

import { Switch } from '@/components/ui/switch';

type MyComponentProps = {
  settingsRef: {};
};

const SettingsBox: React.FC<MyComponentProps> = ({ settingsRef }) => {
  const { toggleColorMode, colorMode } = useColorMode();

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
      bg={colorMode === 'dark' ? 'blackAlpha.700' : 'whiteAlpha.700'}
    >
      <Flex
        alignItems="center"
        gap={2}
        paddingX={1}
        paddingY={1}
        cursor="pointer"
        borderRadius="inherit"
        _hover={{ bg: `${colorMode === 'dark' ? 'gray.600' : 'gray.300'}` }}
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
        gap={2}
        paddingX={1}
        paddingY={1}
        borderRadius="inherit"
        marginTop={1}
        cursor="pointer"
        _hover={{ bg: `${colorMode === 'dark' ? 'gray.600' : 'gray.300'}` }}
      >
        {colorMode === 'dark' ? (
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
            defaultChecked={true}
            onChange={() => {
              toggleColorMode();
            }}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default SettingsBox;
