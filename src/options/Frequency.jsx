import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export function Frequency({ chartData }) {
    let options = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Chart.js Horizontal Bar Chart',
            },
        },
    };
    
    // let scores = {
    //     0:0,
    //     1:0,
    //     2:0,
    //     3:0,
    //     4:0,
    //     5:0,
    //     6:0,
    //     7:0,
    //     8:0,
    //     9:0
    // }

    // chartData.forEach((game) => {
    //     scores[game.score]++
    // })
    // let dataset = []
    // for(let scoreIndex in scores){
    //     dataset.push({x: scoreIndex, y: scores[scoreIndex]})
    // }
    // console.log(chartData)
    let data = {
        datasets: [
            {
                label: 'Dataset 1',
                data: chartData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    return (<Bar options={options} data={data} />);
}  