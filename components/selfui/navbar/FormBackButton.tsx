import { IconButton } from '@chakra-ui/react';
import { MdArrowBack } from 'react-icons/md';

type MyComponentProps = {
  colorMode: string;
  onSetLogin?: (value: boolean) => void;
  onSetLoginWithEmail?: (value: boolean) => void;
  onSetForgotPassword?: (value: boolean) => void;
  onSetSignup?: (value: boolean) => void;
};

const FormBackButton: React.FC<MyComponentProps> = ({
  colorMode,
  onSetLogin,
  onSetLoginWithEmail,
  onSetForgotPassword,
  onSetSignup,
}) => {
  return (
    <IconButton
      aria-label="back"
      alignSelf="flex-start"
      marginLeft="4px"
      size="lg"
      bg="transparent"
      _hover={{
        bg: colorMode === 'dark' ? 'gray.600' : 'gray.300',
      }}
      onClick={() => {
        onSetLogin?.(true);
        onSetLoginWithEmail?.(false);
        onSetForgotPassword?.(false);
        onSetSignup?.(false);
      }}
    >
      <MdArrowBack />
    </IconButton>
  );
};

export default FormBackButton;
