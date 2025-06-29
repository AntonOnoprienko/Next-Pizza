export const logSizeTracker = (label: string, obj: any) => {
  if (process.env.NODE_ENV !== 'development') return;

  const sizeInBytes = new Blob([JSON.stringify(obj)]).size;
  const sizeInKB = sizeInBytes / 1024;

  console.log(
    `%c📦💾 ${label}: ${sizeInKB.toFixed(2)} КБ`
  );
};
