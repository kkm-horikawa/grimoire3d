export function readFrame(
  width: number,
  height: number
): { width: number; height: number } {
  return {
    width: Math.min(width * 0.86, height * 2.2),
    height: Math.min(height * 0.88, width * 0.82),
  };
}
