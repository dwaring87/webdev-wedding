export const useSleep = () => {
  const sleep = (ms: number): Promise<null> => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  return { sleep }
}