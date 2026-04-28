type VolumeChartData = {
  total_volumes: [number, number][];
};

export const formatVolumeChartData = (volumeChartData: VolumeChartData) => {
  if (!volumeChartData?.total_volumes) return [];

  return volumeChartData.total_volumes.map(([timestamp, volume]) => ({
    timestamp,
    date: new Date(timestamp).toISOString(),
    volume,
  }));
};
