'use client';

import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const Code = ({ children, ...props }: ReturnType<SyntaxHighlighter>) => (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <SyntaxHighlighter language="json" style={dark} {...props}>
        {children}
    </SyntaxHighlighter>
);
