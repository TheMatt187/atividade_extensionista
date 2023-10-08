'use client';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top' as const,
		},
	},
};

const labels = ['Mês'];

export default function ChartGraphic({
	dataGraphic,
	backgroudColor,
	borderColor,
	label,
}: ChartProps) {
	ChartJS.register(
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement,
		Title,
		Tooltip,
		Legend
	);

	const data = {
		labels,
		datasets: [
			{
				label: label,
				data: dataGraphic,
				borderColor: borderColor,
				backgroundColor: backgroudColor,
			},
		],
	};

	return <Line options={options} data={data} />;
}

interface Registro {
	dataMovimento: string;
	valorMovimento: number;
}

interface RegistroCompleto {
	registro: {
		listMovimentos: Registro[];
	};
}

interface JsonData {
	registros: RegistroCompleto[];
}
function extrairDados(jsonData: JsonData): [string, number][] {
	const resultados: [string, number][] = [];

	for (const registro of jsonData.registros) {
		const dataMovimento = registro.registro.listMovimentos[0].dataMovimento;
		const valorMovimento = registro.registro.listMovimentos[0].valorMovimento;

		resultados.push([dataMovimento, valorMovimento]);
	}

	return resultados;
}

function formatarData(data: string) {
	const partes = data.split('-');
	return `${partes[2]}/${partes[1]}/${partes[0]}`;
}
function parseDate(dateStr: string): Date {
	const parts = dateStr.split('/');
	return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
}
