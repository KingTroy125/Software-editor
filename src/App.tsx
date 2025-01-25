import React from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { Download, Moon, Sun, Upload } from 'lucide-react';
import JSZip from 'jszip';
import type { EditorState } from './types';

function App() {
  const [isDark, setIsDark] = useLocalStorage('theme', true);
  const [code, setCode] = useLocalStorage<EditorState>('code', {
    html: '',
    css: '',
    javascript: '',
  });

  const handleExport = async () => {
    const zip = new JSZip();
    zip.file('index.html', code.html);
    zip.file('styles.css', code.css);
    zip.file('script.js', code.javascript);
    
    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'codecraft-project.zip';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const zip = await JSZip.loadAsync(e.target?.result);
        const html = await zip.file('index.html')?.async('string') || '';
        const css = await zip.file('styles.css')?.async('string') || '';
        const js = await zip.file('script.js')?.async('string') || '';
        
        setCode({ html, css, javascript: js });
      } catch (error) {
        console.error('Failed to import project:', error);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-black min-h-screen text-black dark:text-white">
        <nav className="border-b border-black/10 dark:border-white/10 bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
            <h1 className="text-2xl font-mono tracking-tight">CodeCraft</h1>
            <div className="flex gap-6">
              <button
                onClick={handleExport}
                className="hover:bg-black/5 dark:hover:bg-white/5 p-2 rounded-md transition-colors"
                title="Export Project"
              >
                <Download size={20} />
              </button>
              <label className="hover:bg-black/5 dark:hover:bg-white/5 p-2 rounded-md transition-colors cursor-pointer">
                <Upload size={20} />
                <input
                  type="file"
                  accept=".zip"
                  className="hidden"
                  onChange={handleImport}
                />
              </label>
              <button
                onClick={() => setIsDark(!isDark)}
                className="hover:bg-black/5 dark:hover:bg-white/5 p-2 rounded-md transition-colors"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto p-4 grid grid-cols-2 gap-6 h-[calc(100vh-4rem)]">
          <div className="space-y-6">
            <div className="h-1/3">
              <div className="border border-black/10 dark:border-white/10 rounded-lg h-full">
                <div className="px-4 py-2 border-b border-black/10 dark:border-white/10">
                  <h2 className="font-mono text-sm tracking-wide">HTML</h2>
                </div>
                <div className="p-2 h-[calc(100%-2.5rem)]">
                  <Editor
                    language="html"
                    value={code.html}
                    onChange={(value) => setCode({ ...code, html: value })}
                    isDark={isDark}
                  />
                </div>
              </div>
            </div>
            <div className="h-1/3">
              <div className="border border-black/10 dark:border-white/10 rounded-lg h-full">
                <div className="px-4 py-2 border-b border-black/10 dark:border-white/10">
                  <h2 className="font-mono text-sm tracking-wide">CSS</h2>
                </div>
                <div className="p-2 h-[calc(100%-2.5rem)]">
                  <Editor
                    language="css"
                    value={code.css}
                    onChange={(value) => setCode({ ...code, css: value })}
                    isDark={isDark}
                  />
                </div>
              </div>
            </div>
            <div className="h-1/3">
              <div className="border border-black/10 dark:border-white/10 rounded-lg h-full">
                <div className="px-4 py-2 border-b border-black/10 dark:border-white/10">
                  <h2 className="font-mono text-sm tracking-wide">JavaScript</h2>
                </div>
                <div className="p-2 h-[calc(100%-2.5rem)]">
                  <Editor
                    language="javascript"
                    value={code.javascript}
                    onChange={(value) => setCode({ ...code, javascript: value })}
                    isDark={isDark}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border border-black/10 dark:border-white/10 rounded-lg">
            <div className="px-4 py-2 border-b border-black/10 dark:border-white/10">
              <h2 className="font-mono text-sm tracking-wide">Preview</h2>
            </div>
            <div className="p-2 h-[calc(100%-2.5rem)]">
              <Preview code={code} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;