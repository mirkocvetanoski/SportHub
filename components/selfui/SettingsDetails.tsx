'use client';

import {
  Flex,
  Text,
  Separator,
  Stack,
  Grid,
  Box,
  HStack,
} from '@chakra-ui/react';
import FormLayout from './FormLayout';
import { Radio, RadioGroup } from '../ui/radio';

import React, { Dispatch, SetStateAction, useState } from 'react';
import { useColorMode } from '@/components/ui/color-mode';
import { useClickAway } from '@uidotdev/usehooks';

import { OPEN_ANIMATION, CLOSED_ANIMATION } from '@/lib/constants';
import FormCloseButton from './FormCloseButton';

interface ChildComponentProps {
  onSetSettingsDetails: Dispatch<SetStateAction<boolean>>;
  animationDataState: string;
  onSetAnimationDataState: Dispatch<SetStateAction<string>>;
}

export const SettingsDetails: React.FC<ChildComponentProps> = ({
  onSetSettingsDetails,
  animationDataState,
  onSetAnimationDataState,
}) => {
  const [orderBy, setOrderBy] = useState('league name');
  const [notifications, setNotifications] = useState('without');
  const [oddsFormat, setOddsFormat] = useState('eu');
  const { colorMode } = useColorMode();

  const settingsDetailsRef: {} = useClickAway(e => {
    if (e.target === document.getElementById('center-settings')) {
      setTimeout(() => {
        onSetSettingsDetails(false);
      }, CLOSED_ANIMATION);
      onSetAnimationDataState('closed');
    }
  });

  return (
    <FormLayout
      id="center-settings"
      animationDataState={animationDataState}
      openTime={OPEN_ANIMATION}
      closeTime={CLOSED_ANIMATION}
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
        data-state={animationDataState}
        _open={{
          animationName: 'fade-in, scale-in',
          animationDuration: `${OPEN_ANIMATION}ms`,
        }}
        _closed={{
          animationName: 'fade-out, scale-out',
          animationDuration: `${CLOSED_ANIMATION}ms`,
        }}
      >
        <Flex alignItems="center" justify="space-between">
          <Text fontSize="xl" fontWeight="semibold" paddingX={6}>
            Settings
          </Text>
          <FormCloseButton
            colorMode={colorMode}
            onSetSettingsDetails={onSetSettingsDetails}
            onSetAnimationDataState={onSetAnimationDataState}
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
            display="flex"
            flexDirection="column"
            gap={1}
          >
            <HStack
              gap="8px"
              width="fit-content"
              cursor="pointer"
              onClick={() => setOrderBy('league name')}
            >
              <Radio
                value="league name"
                border="1px solid"
                borderColor="green.600"
                colorPalette="green"
                rounded="full"
              />
              <Text fontSize="13px">League name</Text>
            </HStack>

            <HStack
              gap="8px"
              width="fit-content"
              cursor="pointer"
              onClick={() => setOrderBy('start time')}
            >
              <Radio
                value="start time"
                border="1px solid"
                borderColor="green.600"
                colorPalette="green"
                rounded="full"
              />
              <Text fontSize="13px">Match Start Time</Text>
            </HStack>
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
            display="flex"
            flexDirection="column"
            gap={1}
          >
            <HStack
              gap="8px"
              width="fit-content"
              cursor="pointer"
              onClick={() => setNotifications('with')}
            >
              <Radio
                value="with"
                border="1px solid"
                borderColor="green.600"
                colorPalette="green"
                rounded="full"
              />
              <Text fontSize="13px">Yes, with sound effects</Text>
            </HStack>

            <HStack
              gap="8px"
              width="fit-content"
              cursor="pointer"
              onClick={() => setNotifications('without')}
            >
              <Radio
                value="without"
                border="1px solid"
                borderColor="green.600"
                colorPalette="green"
                rounded="full"
              />
              <Text fontSize="13px">Yes, without sound effects</Text>
            </HStack>

            <HStack
              gap="8px"
              width="fit-content"
              cursor="pointer"
              onClick={() => setNotifications('no')}
            >
              <Radio
                value="no"
                border="1px solid"
                borderColor="green.600"
                colorPalette="green"
                rounded="full"
              />
              <Text fontSize="13px">No</Text>
            </HStack>
          </RadioGroup>
        </Stack>

        <Separator height="1px" bg="gray.emphasized" width="full" />

        {/* ODDS FORMAT */}
        <Stack direction="column" paddingX="6">
          <Text fontWeight="semibold" fontSize="md" marginBottom={1}>
            Odds format
          </Text>

          <RadioGroup size="xs" variant="outline" value={oddsFormat}>
            <Grid
              templateColumns="repeat(3, max-content)"
              templateRows="repeat(2, 1fr)"
              columnGap={8}
              rowGap={2}
            >
              <HStack
                gap="8px"
                width="fit-content"
                cursor="pointer"
                onClick={() => setOddsFormat('eu')}
              >
                <Radio
                  value="eu"
                  border="1px solid"
                  borderColor="green.600"
                  colorPalette="green"
                  rounded="full"
                />
                <Text fontSize="13px">EU (1.50)</Text>
              </HStack>

              <HStack
                gap="8px"
                width="fit-content"
                cursor="pointer"
                onClick={() => setOddsFormat('uk')}
              >
                <Radio
                  value="uk"
                  border="1px solid"
                  borderColor="green.600"
                  colorPalette="green"
                  rounded="full"
                />
                <Text fontSize="13px">UK (1/2)</Text>
              </HStack>

              <HStack
                gap="8px"
                width="fit-content"
                cursor="pointer"
                onClick={() => setOddsFormat('us')}
              >
                <Radio
                  value="us"
                  border="1px solid"
                  borderColor="green.600"
                  colorPalette="green"
                  rounded="full"
                />
                <Text fontSize="13px">US (-200)</Text>
              </HStack>

              <HStack
                gap="8px"
                width="fit-content"
                cursor="pointer"
                onClick={() => setOddsFormat('hk')}
              >
                <Radio
                  value="hk"
                  border="1px solid"
                  borderColor="green.600"
                  colorPalette="green"
                  rounded="full"
                />
                <Text fontSize="13px">HK (0.50)</Text>
              </HStack>

              <HStack
                gap="8px"
                width="fit-content"
                cursor="pointer"
                onClick={() => setOddsFormat('ma')}
              >
                <Radio
                  value="ma"
                  border="1px solid"
                  borderColor="green.600"
                  colorPalette="green"
                  rounded="full"
                />
                <Text fontSize="13px">MA (0.50)</Text>
              </HStack>

              <HStack
                gap="8px"
                width="fit-content"
                cursor="pointer"
                onClick={() => setOddsFormat('in')}
              >
                <Radio
                  value="in"
                  border="1px solid"
                  borderColor="green.600"
                  colorPalette="green"
                  rounded="full"
                />
                <Text fontSize="13px">IN (-2.00)</Text>
              </HStack>
            </Grid>
          </RadioGroup>
        </Stack>
      </Box>
    </FormLayout>
  );
};
