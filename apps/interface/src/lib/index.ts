/* eslint-disable @typescript-eslint/no-explicit-any */
export const formatDuration = (durationInMinutes: number): string => {
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;
  return `${hours}h ${minutes}m`;
};

export const formatTime = (timestamp: any) => {
  if (timestamp && timestamp._seconds) {
    const date = new Date(timestamp._seconds * 1000);
    return date.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  return "N/A";
};
