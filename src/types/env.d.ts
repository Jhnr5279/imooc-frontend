/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_BASE_API: string
  readonly VITE_SECRET_ID: string
  readonly VITE_SECRET_KEY: string
  readonly VITE_BUCKET_NAME: string
  readonly VITE_REGION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
