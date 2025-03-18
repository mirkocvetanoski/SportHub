import { Center } from '@chakra-ui/react';

type FormLayoutProps = {
  children: React.ReactNode;
  id: string;
  animationDataState: string;
  openTime: number;
  closeTime: number;
};

const FormLayout: React.FC<FormLayoutProps> = ({
  children,
  id,
  animationDataState,
  openTime,
  closeTime,
}) => {
  return (
    <Center
      id={id}
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      right="0"
      bottom="0"
      bg="blackAlpha.600" // Semi-transparent black background
      zIndex="overlay" // Ensures it's above everything
      data-state={animationDataState}
      _open={{
        animationName: 'fade-in, scale-in',
        animationDuration: `${openTime}ms`,
      }}
      _closed={{
        animationName: 'fade-out, scale-out',
        animationDuration: `${closeTime}ms`,
      }}
    >
      {children}
    </Center>
  );
};

export default FormLayout;
