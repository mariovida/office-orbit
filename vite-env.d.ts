/// <reference types="vite/client" />
interface ImportMetaEnv {
  // Type definitions for environment variables
  readonly VITE_KRIKEM_BACKEND_URL: string;
  readonly VITE_KRIKEM_URL: string;
  readonly VITE_KRIKEM_LOCAL_URL: string;
  // Add more environment variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
