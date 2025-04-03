import MainLayout from '@/components/selfui/MainLayout';
import {
  Box,
  Text,
  Heading,
  Link,
  ListItem,
  List,
  HStack,
  Separator,
  VStack,
  Flex,
} from '@chakra-ui/react';
import { FcDataProtection, FcServices } from 'react-icons/fc';
import { IoBrowsersOutline } from 'react-icons/io5';
import { LuAccessibility } from 'react-icons/lu';
import {
  MdCheckCircleOutline,
  MdDataUsage,
  MdDevices,
  MdEmail,
  MdMarkEmailRead,
  MdNetworkCheck,
  MdOutlinePermDeviceInformation,
  MdPages,
  MdTipsAndUpdates,
  MdWebStories,
} from 'react-icons/md';

export default function PrivacyPolicy() {
  return (
    <MainLayout>
      <Box
        maxW="container.md"
        px="20%"
        py={5}
        mx="auto"
        fontSize="sm"
        width="100%"
      >
        <Heading
          as="h1"
          fontSize="xl"
          mb={3}
          textDecoration="underline"
          textDecorationThickness="1px"
        >
          Privacy Policy
        </Heading>

        <Text mb={5}>
          At SportsHub, we value your privacy and are committed to protecting
          your personal information. This Privacy Policy outlines how we
          collect, use, and safeguard your data when you visit our website or
          interact with our services.
        </Text>

        <Separator
          height="1px"
          bg="gray.emphasized"
          width="full"
          marginTop={1}
          marginBottom={3}
        />

        <Box px={5}>
          <Heading as="h2" fontSize="lg" mb={4}>
            1. Information We Collect
          </Heading>
          <Text mb={5}>
            We may collect personal information that you provide directly to us,
            such as when you register for an account, subscribe to our
            newsletter, or contact customer support. This information may
            include:
          </Text>
          <List.Root gap={2} mb={5}>
            <ListItem>
              <HStack>
                <MdMarkEmailRead /> Email address
              </HStack>
            </ListItem>
            <ListItem>
              <HStack>
                <MdDataUsage /> Usage data (e.g., browsing activity on the site)
              </HStack>
            </ListItem>
          </List.Root>

          <Text mb={3}>
            We may also collect non-personal data automatically as you interact
            with our website, such as:
          </Text>
          <List.Root gap={2} mb={5}>
            <ListItem>
              <HStack>
                <MdNetworkCheck /> IP address
              </HStack>
            </ListItem>
            <ListItem>
              <HStack>
                <IoBrowsersOutline /> Browser type
              </HStack>
            </ListItem>
            <ListItem>
              <HStack>
                <MdDevices /> Device information
              </HStack>
            </ListItem>
            <ListItem>
              <HStack>
                <MdPages /> Pages visited and time spent on the site
              </HStack>
            </ListItem>
          </List.Root>

          <Separator
            height="1px"
            bg="gray.emphasized"
            width="full"
            marginTop={1}
            marginBottom={3}
          />

          <Heading as="h2" fontSize="lg" mb={3}>
            2. How We Use Your Information
          </Heading>
          <Text mb={5}>
            We use the collected information for the following purposes:
          </Text>
          <List.Root gap={2} mb={5}>
            <ListItem>
              <HStack>
                <FcServices /> To provide and improve our services
              </HStack>
            </ListItem>
            <ListItem>
              <HStack>
                <MdWebStories /> To personalize your experience on our site
              </HStack>
            </ListItem>
            <ListItem>
              <HStack>
                <MdTipsAndUpdates /> To communicate with you about updates,
                promotions, and offers
              </HStack>
            </ListItem>
            <ListItem>
              <HStack>
                <MdDataUsage /> To analyze website usage and trends for
                improvements
              </HStack>
            </ListItem>
            <ListItem>
              <HStack>
                <MdCheckCircleOutline /> To comply with legal obligations or
                resolve disputes
              </HStack>
            </ListItem>
          </List.Root>

          <Separator
            height="1px"
            bg="gray.emphasized"
            width="full"
            marginTop={1}
            marginBottom={3}
          />

          <Heading as="h2" fontSize="lg" mb={3}>
            3. Cookies and Tracking Technologies
          </Heading>
          <Text mb={5}>
            We use cookies and similar tracking technologies to enhance your
            experience on our website. Cookies are small files stored on your
            device that help us analyze web traffic and optimize the site. You
            can choose to disable cookies through your browser settings, though
            this may impact your ability to use certain features of the site.
          </Text>

          <Separator
            height="1px"
            bg="gray.emphasized"
            width="full"
            marginTop={1}
            marginBottom={3}
          />

          <Heading as="h2" fontSize="lg" mb={3}>
            4. Data Sharing
          </Heading>
          <Text mb={5}>
            We do not sell or rent your personal information to third parties.
            However, we may share your data with trusted partners and service
            providers who assist in running the website and providing our
            services. These parties are contractually obligated to keep your
            data confidential and use it solely for the purposes we define.
          </Text>
          <Text mb={5}>
            We may also share your data if required by law, in response to legal
            requests, or to protect the rights, property, or safety of SportsHub
            and its users.
          </Text>

          <Separator
            height="1px"
            bg="gray.emphasized"
            width="full"
            marginTop={1}
            marginBottom={3}
          />

          <Heading as="h2" fontSize="lg" mb={3}>
            5. Data Security
          </Heading>
          <Text mb={5}>
            We implement industry-standard security measures to protect your
            personal information. While we strive to secure your data, no method
            of transmission over the internet is 100% secure, and we cannot
            guarantee the absolute security of your information.
          </Text>

          <Separator
            height="1px"
            bg="gray.emphasized"
            width="full"
            marginTop={1}
            marginBottom={3}
          />

          <Heading as="h2" fontSize="lg" mb={3}>
            6. Your Rights and Choices
          </Heading>
          <Text mb={5}>You have the right to:</Text>
          <List.Root gap={2} mb={5}>
            <ListItem>
              <HStack>
                <LuAccessibility /> Access, update, or delete your personal
                information
              </HStack>
            </ListItem>
            <ListItem>
              <HStack>
                <MdOutlinePermDeviceInformation /> Optimize out of marketing
                communications
              </HStack>
            </ListItem>
            <ListItem>
              <HStack>
                <FcDataProtection /> Request that we restrict the processing of
                your data
              </HStack>
            </ListItem>
          </List.Root>
          <Text mb={5}>
            To exercise any of these rights, please contact us at{' '}
            <Link href="mailto:your-email@example.com">
              your-email@example.com
            </Link>
            .
          </Text>

          <Separator
            height="1px"
            bg="gray.emphasized"
            width="full"
            marginTop={1}
            marginBottom={3}
          />

          <Heading as="h2" fontSize="lg" mb={3}>
            7. Third-Party Links
          </Heading>
          <Text mb={5}>
            Our website may contain links to external sites that are not
            operated by us. We are not responsible for the privacy practices of
            those third parties, and we encourage you to review their privacy
            policies before providing any personal information.
          </Text>

          <Separator
            height="1px"
            bg="gray.emphasized"
            width="full"
            marginTop={1}
            marginBottom={3}
          />

          <Heading as="h2" fontSize="lg" mb={3}>
            8. Changes to This Privacy Policy
          </Heading>
          <Text mb={5}>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated &quot;Effective
            Date.&quot; We encourage you to review this page periodically for
            any updates.
          </Text>

          <Separator
            height="1px"
            bg="gray.emphasized"
            width="full"
            marginTop={1}
            marginBottom={3}
          />

          <Heading as="h2" fontSize="lg" mb={3}>
            9. Contact Us
          </Heading>
          <Text mb={5}>
            If you have any questions or concerns about this Privacy Policy,
            please contact us at:
          </Text>
          <VStack alignItems="start">
            <Flex alignItems="center" gap={2}>
              <Text>Company Name:</Text>
              <Link
                href="mailto:sportshubwebsite2025@gmail.com"
                className="text-1xl bg-gradient-to-r from-[#22c1c3] via-[#22c1c3] to-[#fdbb2d] bg-clip-text font-bold uppercase text-transparent"
              >
                SPORTSHUB
              </Link>
            </Flex>
            <Flex alignItems="center" gap={2}>
              <MdEmail />
              <Link href="mailto:sportshubwebsite2025@gmail.com">
                sportshubwebsite2025@gmail.com
              </Link>
            </Flex>
          </VStack>
        </Box>
      </Box>
    </MainLayout>
  );
}
