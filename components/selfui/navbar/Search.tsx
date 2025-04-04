import FormLayout from './FormLayout';
import { Box, Flex, Separator, Text, Input } from '@chakra-ui/react';

import FormCloseButton from './FormCloseButton';
import { LuSearch } from 'react-icons/lu';

import { useColorMode } from '../../ui/color-mode';
import { Dispatch, SetStateAction } from 'react';
import { CLOSED_ANIMATION, OPEN_ANIMATION } from '@/lib/constants';
import { useClickAway } from '@uidotdev/usehooks';
import SearchDropdown from './SearchDropdown';
import { InputGroup } from '../../ui/input-group';

interface ChildComponentProps {
  onSetSearch: Dispatch<SetStateAction<boolean>>;
  animationDataState: string;
  onSetAnimationDataState: Dispatch<SetStateAction<string>>;
}

const Search: React.FC<ChildComponentProps> = ({
  onSetSearch,
  animationDataState,
  onSetAnimationDataState,
}) => {
  const { colorMode } = useColorMode();

  const searchRef: {} = useClickAway(e => {
    if (e.target === document.getElementById('center-search')) {
      setTimeout(() => {
        onSetSearch(false);
      }, CLOSED_ANIMATION);
      onSetAnimationDataState('closed');
    }
  });

  return (
    <FormLayout
      id="center-search"
      animationDataState={animationDataState}
      openTime={OPEN_ANIMATION}
      closeTime={CLOSED_ANIMATION}
    >
      <Box
        ref={searchRef}
        width="2/6"
        height="fit-content"
        flexDirection="column"
        bg="gray.subtle"
        rounded="md"
        display="flex"
        flexDir="column"
        gap={4}
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
            Search
          </Text>
          <FormCloseButton
            colorMode={colorMode}
            onSetSearch={onSetSearch}
            onSetAnimationDataState={onSetAnimationDataState}
          />
        </Flex>

        <Separator height="1px" bg="gray.emphasized" width="full" />

        <InputGroup
          w="calc(100% - 48px)"
          alignSelf="center"
          startElement={<LuSearch />}
          endElement={<SearchDropdown />}
        >
          <Input
            placeholder="Search matches"
            border="1px solid"
            borderColor="gray.emphasized"
            outlineWidth="1px"
            outlineColor="gray.500"
          />
        </InputGroup>
      </Box>
    </FormLayout>
  );
};

export default Search;
