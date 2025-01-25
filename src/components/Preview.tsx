import React, { useEffect, useRef } from 'react';
import type { EditorState } from '../types';

interface PreviewProps {
  code: EditorState;
}

export function Preview({ code }: PreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    const combinedCode = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${code.css}</style>
        </head>
        <body>
          ${code.html}
          <script>${code.javascript}</script>
        </body>
      </html>
    `;

    const iframe = iframeRef.current;
    iframe.srcdoc = combinedCode;
  }, [code]);

  return (
    <iframe
      ref={iframeRef}
      title="preview"
      className="w-full h-full bg-white dark:bg-black rounded-md"
      sandbox="allow-scripts"
    />
  );
}