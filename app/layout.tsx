import type { Metadata } from 'next';
import './globals.css';
import '@fontsource/roboto';

import { Provider } from '@/components/ui/provider';
import AuthProvider from '@/components/selfui/navbar/AuthProvider';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ColorModeProvider } from '@/components/ui/color-mode';
import { Suspense } from 'react';
import ClientOnly from '@/components/client/ClientWrapper';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <AuthProvider>
      <html suppressHydrationWarning>
        <body className="min-w-screen min-h-screen">
          <SpeedInsights />
          <Provider>
            <ClientOnly>
              <Suspense
                fallback={
                  <div style={{ visibility: 'hidden' }}>{children}</div>
                }
              >
                <ColorModeProvider>{children}</ColorModeProvider>
              </Suspense>
            </ClientOnly>
          </Provider>
        </body>
      </html>
    </AuthProvider>
  );
}
