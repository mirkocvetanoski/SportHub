import { CloseButton } from '@chakra-ui/react';
import { CLOSED_ANIMATION } from '@/lib/constants';

type MyComponentProps = {
  colorMode: string;
  onSetSearch?: (value: boolean) => void;
  onSetLogin?: (value: boolean) => void;
  onSetLoginWithEmail?: (value: boolean) => void;
  onSetSettingsDetails?: (value: boolean) => void;
  onSetAnimationDataState?: (value: string) => void;
};

const FormCloseButton: React.FC<MyComponentProps> = ({
  colorMode,
  onSetSearch,
  onSetLogin,
  onSetLoginWithEmail,
  onSetSettingsDetails,
  onSetAnimationDataState,
}) => {
  return (
    <CloseButton
      alignSelf="flex-end"
      size="lg"
      bg="transparent"
      aria-label="Close"
      marginRight="4px"
      _hover={{
        bg: colorMode === 'dark' ? 'gray.600' : 'gray.300',
      }}
      onClick={() => {
        setTimeout(() => {
          onSetSearch?.(false);
          onSetLogin?.(false);
          onSetLoginWithEmail?.(false);
          onSetSettingsDetails?.(false);
        }, CLOSED_ANIMATION);
        onSetAnimationDataState?.('closed');
      }}
    />
  );
};

export default FormCloseButton;
