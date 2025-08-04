'use client';

import { Provider } from 'jotai';
import { type ReactNode } from 'react';
import { QueryProvider } from './queryClient';
import { TooltipProvider } from '@radix-ui/react-tooltip';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider>
      <QueryProvider>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </QueryProvider>
    </Provider>
  );
}
