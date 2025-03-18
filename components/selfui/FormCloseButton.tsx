import { CloseButton } from '@chakra-ui/react';
import { CLOSED_ANIMATION } from '@/lib/constants';

type MyComponentProps = {
  colorMode: string;
  onSetLogin?: (value: boolean) => void;
  onSetLoginWithEmail?: (value: boolean) => void;
  onSetAnimationDataState?: (value: string) => void;
};

const FormCloseButton: React.FC<MyComponentProps> = ({
  colorMode,
  onSetLogin,
  onSetLoginWithEmail,
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
          onSetLogin?.(false);
          onSetLoginWithEmail?.(false);
        }, CLOSED_ANIMATION);
        onSetAnimationDataState?.('closed');
      }}
    />
  );
};

export default FormCloseButton;
