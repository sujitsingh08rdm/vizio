export function durationCalculator(seconds: number): string {
  const minutes: number = Math.floor(seconds / 60);
  const remainingSeconds: number = Math.floor(seconds % 60);

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds,
  ).padStart(2, "0")}`;
}

export function sizeCalculator(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const units = ["Bytes", "KB", "MB", "GB", "TB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));

  const size = bytes / Math.pow(1024, index);

  return `${size.toFixed(2)} ${units[index]}`;
}
