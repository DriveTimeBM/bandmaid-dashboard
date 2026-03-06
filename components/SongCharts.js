import { Bar } from 'react-chartjs-2';

export function StreamsChart({ links }) {
  const data = {
    labels: links.map((link) => link.Service),
    datasets: [
      {
        label: 'Streams',
        data: links.map((link) => link.Streams),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };
  return <Bar data={data} />;
}

export function ViewsChart({ videos }) {
  const data = {
    labels: videos.map((video) => video.Title),
    datasets: [
      {
        label: 'Views',
        data: videos.map((video) => video.Views),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };
  return <Bar data={data} />;
}
