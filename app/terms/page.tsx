import MainLayout from '@/components/selfui/navbar/MainLayout';
import {
  Box,
  Flex,
  Heading,
  Separator,
  Text,
  VStack,
  Link,
} from '@chakra-ui/react';
import { MdEmail } from 'react-icons/md';

import { formatDate } from '@/lib/formatTime';

export default function Terms() {
  const today = new Date().toDateString();

  return (
    <MainLayout>
      <VStack
        maxW="container.md"
        px="20%"
        py={5}
        mx="auto"
        fontSize="sm"
        width="100vw"
      >
        <Heading
          as="h1"
          fontSize="xl"
          textDecoration="underline"
          textDecorationThickness="1px"
        >
          Terms of Use
        </Heading>
        <Text fontSize="sm" color="gray.500" alignSelf="start">
          Last Updated: {formatDate(today)}
        </Text>

        <Separator
          height="1px"
          bg="gray.emphasized"
          width="full"
          marginTop={1}
          marginBottom={3}
        />

        <VStack px={5} gap={2} alignItems="start" width="full">
          <Heading as="h2" fontSize="md">
            1. Acceptance of Terms
          </Heading>
          <Text>
            By accessing SPORTSHUB, you agree to comply with these Terms of Use
            and all applicable laws and regulations.
          </Text>

          <Separator
            height="1px"
            bg="gray.emphasized"
            width="full"
            marginTop={1}
            marginBottom={3}
          />

          <Heading as="h2" fontSize="md">
            2. User Conduct
          </Heading>
          <Text>You agree to use SPORTSHUB responsibly and refrain from:</Text>
          <Box pl={5}>
            <Text>• Posting misleading, harmful, or offensive content.</Text>
            <Text>• Violating any applicable laws.</Text>
            <Text>
              • Attempting to hack, scrape, or interfere with the website’s
              functionality.
            </Text>
          </Box>

          <Separator
            height="1px"
            bg="gray.emphasized"
            width="full"
            marginTop={1}
            marginBottom={3}
          />

          <Heading as="h2" fontSize="md">
            3. Content and Intellectual Property
          </Heading>
          <Text>
            All content on SPORTSHUB (text, images, logos, etc.) is owned by us
            or licensed to us. You may not copy, distribute, or modify our
            content without permission.
          </Text>

          <Separator
            height="1px"
            bg="gray.emphasized"
            width="full"
            marginTop={1}
            marginBottom={3}
          />

          <Heading as="h2" fontSize="md">
            4. Third-Party Links
          </Heading>
          <Text>
            SPORTSHUB may contain links to external sites. We are not
            responsible for their content or practices.
          </Text>

          <Separator
            height="1px"
            bg="gray.emphasized"
            width="full"
            marginTop={1}
            marginBottom={3}
          />

          <Heading as="h2" fontSize="md">
            5. Disclaimers
          </Heading>
          <Text>
            We do not guarantee uninterrupted or error-free access to Sportshub.
            All sports data and results are provided &quot;as-is&quot; without
            warranties of accuracy.
          </Text>

          <Separator
            height="1px"
            bg="gray.emphasized"
            width="full"
            marginTop={1}
            marginBottom={3}
          />

          <Heading as="h2" fontSize="md">
            6. Limitation of Liability
          </Heading>
          <Text>
            Sportshub is not liable for any damages resulting from your use of
            the website.
          </Text>

          <Separator
            height="1px"
            bg="gray.emphasized"
            width="full"
            marginTop={1}
            marginBottom={3}
          />

          <Heading as="h2" fontSize="md">
            7. Changes to Terms
          </Heading>
          <Text>
            We may update these Terms of Use at any time. Continued use of the
            site constitutes acceptance of the updated terms.
          </Text>

          <Separator
            height="1px"
            bg="gray.emphasized"
            width="full"
            marginTop={1}
            marginBottom={3}
          />

          <Heading as="h2" fontSize="md">
            8. Contact Us
          </Heading>
          <Flex alignItems="center" gap={2}>
            <MdEmail />
            <Link href="mailto:sportshubwebsite2025@gmail.com">
              sportshubwebsite2025@gmail.com
            </Link>
          </Flex>
        </VStack>
      </VStack>
    </MainLayout>
  );
}
