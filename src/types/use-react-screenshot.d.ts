declare module "use-react-screenshot" {
  type HookReturn = [
    string | null,
    (node: HTMLElement) => Promise<string>,
    { error: string | null }
  ];
  const useScreenshot: (options?: {
    type?: string;
    quality?: number;
  }) => HookReturn;
  const createFileName: (extension?: string, ...names: string[]) => string;
  export { useScreenshot, createFileName };
}
