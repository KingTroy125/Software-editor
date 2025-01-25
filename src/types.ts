export interface EditorState {
  html: string;
  css: string;
  javascript: string;
}

export interface Theme {
  isDark: boolean;
  toggle: () => void;
}