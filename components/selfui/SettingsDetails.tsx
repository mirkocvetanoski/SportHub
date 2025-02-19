'use client';

import {
  Flex,
  Text,
  Center,
  Separator,
  Stack,
  Grid,
  CloseButton,
  Box,
} from '@chakra-ui/react';
import { Radio, RadioGroup } from '../ui/radio';

import React, { Dispatch, SetStateAction, useState } from 'react';
import { useColorMode } from '@/components/ui/color-mode';
import { useClickAway } from '@uidotdev/usehooks';

interface ChildComponentProps {
  onSetSettingsDetails: Dispatch<SetStateAction<boolean>>;
}

export const SettingsDetails: React.FC<ChildComponentProps> = ({
  onSetSettingsDetails,
}) => {
  const [orderBy, setOrderBy] = useState('league name');
  const [notifications, setNotifications] = useState('without');
  const [oddsFormat, setOddsFormat] = useState('eu');
  const { colorMode } = useColorMode();

  const settingsDetailsRef: {} = useClickAway(e => {
    if (e.target === document.getElementById('center-settings')) {
      onSetSettingsDetails(false);
    }
  });

  return (
    <Center
      id="center-settings"
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      right="0"
      bottom="0"
      bg="blackAlpha.600" // Semi-transparent black background
      zIndex="overlay" // Ensures it's above everything
    >
      <Box
        ref={settingsDetailsRef}
        width="2/6"
        height="fit-content"
        flexDirection="column"
        bg="gray.subtle"
        rounded="md"
        display="flex"
        flexDir="column"
        gap={3}
        paddingY={4}
      >
        <Flex alignItems="center" justify="space-between">
          <Text fontSize="xl" fontWeight="semibold" paddingX="6">
            Settings
          </Text>
          <CloseButton
            size="lg"
            bg="transparent"
            aria-label="Close"
            marginRight="4px"
            _hover={{
              bg: colorMode === 'dark' ? 'gray.600' : 'gray.300',
            }}
            onClick={() => {
              onSetSettingsDetails(false);
            }}
          />
        </Flex>

        <Separator height="1px" bg="gray.emphasized" width="full" />

        {/* GENERAL SETTINGS */}
        <Stack direction="column" paddingX="6">
          <Text fontWeight="semibold" fontSize="md" marginBottom={2}>
            General Settings
          </Text>
          <Text marginBottom={1} fontSize="sm">
            Order matches by:
          </Text>

          <RadioGroup
            size="xs"
            variant="outline"
            value={orderBy}
            onValueChange={e => setOrderBy(e.value)}
            display="flex"
            flexDirection="column"
            gap={1}
          >
            <Stack direction="row" alignItems="center">
              <Radio
                value="league name"
                border="1px solid"
                borderColor="green.600"
                colorPalette="green"
                rounded="full"
              />
              <Text fontSize="13px">League name</Text>
            </Stack>

            <Stack direction="row" alignItems="center">
              <Radio
                value="start time"
                border="1px solid"
                borderColor="green.600"
                colorPalette="green"
                rounded="full"
              />
              <Text fontSize="13px">Match Start Time</Text>
            </Stack>
          </RadioGroup>
        </Stack>

        <Separator height="1px" bg="gray.emphasized" width="full" />

        {/* MY GAMES */}
        <Stack direction="column" paddingX="6">
          <Text fontWeight="semibold" fontSize="md" marginBottom={2}>
            My Games
          </Text>
          <Text marginBottom={1} fontSize="sm">
            Display notifications in the bottom left corner of the screen:
          </Text>

          <RadioGroup
            size="xs"
            variant="outline"
            value={notifications}
            onValueChange={e => setNotifications(e.value)}
            display="flex"
            flexDirection="column"
            gap={1}
          >
            <Stack direction="row" alignItems="center">
              <Radio
                value="with"
                border="1px solid"
                borderColor="green.600"
                colorPalette="green"
                rounded="full"
              />
              <Text fontSize="13px">Yes, with sound effects</Text>
            </Stack>

            <Stack direction="row" alignItems="center">
              <Radio
                value="without"
                border="1px solid"
                borderColor="green.600"
                colorPalette="green"
                rounded="full"
              />
              <Text fontSize="13px">Yes, without sound effects</Text>
            </Stack>

            <Stack direction="row" alignItems="center">
              <Radio
                value="no"
                border="1px solid"
                borderColor="green.600"
                colorPalette="green"
                rounded="full"
              />
              <Text fontSize="13px">No</Text>
            </Stack>
          </RadioGroup>
        </Stack>

        <Separator height="1px" bg="gray.emphasized" width="full" />

        {/* ODDS FORMAT */}
        <Stack direction="column" paddingX="6">
          <Text fontWeight="semibold" fontSize="md" marginBottom={1}>
            Odds format
          </Text>

          <RadioGroup
            size="xs"
            variant="outline"
            value={oddsFormat}
            onValueChange={e => setOddsFormat(e.value)}
          >
            <Grid
              templateColumns="repeat(3, max-content)"
              templateRows="repeat(2, 1fr)"
              columnGap={8}
              rowGap={2}
            >
              <Stack direction="row" alignItems="center">
                <Radio
                  value="eu"
                  border="1px solid"
                  borderColor="green.600"
                  colorPalette="green"
                  rounded="full"
                />
                <Text fontSize="13px">EU (1.50)</Text>
              </Stack>

              <Stack direction="row" alignItems="center">
                <Radio
                  value="uk"
                  border="1px solid"
                  borderColor="green.600"
                  colorPalette="green"
                  rounded="full"
                />
                <Text fontSize="13px">UK (1/2)</Text>
              </Stack>

              <Stack direction="row" alignItems="center">
                <Radio
                  value="us"
                  border="1px solid"
                  borderColor="green.600"
                  colorPalette="green"
                  rounded="full"
                />
                <Text fontSize="13px">US (-200)</Text>
              </Stack>

              <Stack direction="row" alignItems="center">
                <Radio
                  value="hk"
                  border="1px solid"
                  borderColor="green.600"
                  colorPalette="green"
                  rounded="full"
                />
                <Text fontSize="13px">HK (0.50)</Text>
              </Stack>

              <Stack direction="row" alignItems="center">
                <Radio
                  value="ma"
                  border="1px solid"
                  borderColor="green.600"
                  colorPalette="green"
                  rounded="full"
                />
                <Text fontSize="13px">MA (0.50)</Text>
              </Stack>

              <Stack direction="row" alignItems="center">
                <Radio
                  value="in"
                  border="1px solid"
                  borderColor="green.600"
                  colorPalette="green"
                  rounded="full"
                />
                <Text fontSize="13px">IN (-2.00)</Text>
              </Stack>
            </Grid>
          </RadioGroup>
        </Stack>
      </Box>
    </Center>
  );
};
