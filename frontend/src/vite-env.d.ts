declare module '*.css';
declare module '*.scss';
declare module '*.png';
declare module '*.jpg';
declare module '*.svg';
interface ImportMetaEnv 
{
	readonly VITE_API_URL?: string;
	readonly VITE_APP_NAME?: string;
	readonly MODE: string;
}

interface ImportMeta 
{
	readonly env: ImportMetaEnv;
}
