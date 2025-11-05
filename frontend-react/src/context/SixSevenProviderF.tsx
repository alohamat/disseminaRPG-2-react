import { SixSevenProvider } from "./SixSevenProvider";
import React from 'react';

export function SixSevenProviderF({children}: {children: React.ReactNode}) {
    return <SixSevenProvider>{children}</SixSevenProvider>
}