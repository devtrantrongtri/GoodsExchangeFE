/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_BASE_URL: string;
    // Các biến môi trường khác nếu cần
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  