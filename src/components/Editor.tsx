import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

interface EditorProps {
  language: 'html' | 'css' | 'javascript';
  value: string;
  onChange: (value: string) => void;
  isDark: boolean;
}

const languageMap = {
  html: html(),
  css: css(),
  javascript: javascript(),
};

const placeholders = {
  html: '<!-- Enter your HTML here -->\n<h1>Hello World!</h1>',
  css: '/* Enter your CSS here */\nh1 {\n  color: blue;\n}',
  javascript: '// Enter your JavaScript here\nconsole.log("Hello from CodeCraft!");',
};

export function Editor({ language, value, onChange, isDark }: EditorProps) {
  return (
    <CodeMirror
      value={value || placeholders[language]}
      height="100%"
      extensions={[languageMap[language]]}
      onChange={onChange}
      theme={isDark ? oneDark : undefined}
      basicSetup={{
        lineNumbers: true,
        highlightActiveLineGutter: true,
        highlightSpecialChars: true,
        history: true,
        foldGutter: true,
        drawSelection: true,
        dropCursor: true,
        allowMultipleSelections: true,
        indentOnInput: true,
        syntaxHighlighting: true,
        bracketMatching: true,
        closeBrackets: true,
        autocompletion: true,
        rectangularSelection: true,
        crosshairCursor: true,
        highlightActiveLine: true,
        highlightSelectionMatches: true,
        closeBracketsKeymap: true,
        defaultKeymap: true,
        searchKeymap: true,
        historyKeymap: true,
        foldKeymap: true,
        completionKeymap: true,
        lintKeymap: true,
      }}
      className="h-full rounded-lg overflow-hidden"
      style={{ backgroundColor: isDark ? '#000' : '#fff' }}
    />
  );
}