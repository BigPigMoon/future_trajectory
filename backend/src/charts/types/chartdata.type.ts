interface Dataset {
  label: string;
  data: number[];
}

export interface ChartData {
  type: string;
  labels: string[];
  datasets: Dataset[];
}
