export async function fetchData(url: string) {
	const response = await fetch(url);
	const json: JsonData = await response.json();
	const data = extrairDados(json);
	const formatedData: [string, number][] = data.map(([data, valor]) => [
		formatarData(data),
		valor,
	]);
	formatedData.sort((a, b) => {
		const dateA = parseDate(a[0]);
		const dateB = parseDate(b[0]);

		return dateA.getTime() - dateB.getTime();
	});
	return formatedData;
}

interface JsonData {
	registros: RegistroCompleto[];
}
interface RegistroCompleto {
	registro: {
		listMovimentos: Registro[];
	};
}
interface Registro {
	dataMovimento: string;
	valorMovimento: number;
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
export function calcularTotal(dados: [string, number][]): number {
	let somaTotal = 0;

	for (const [, valor] of dados) {
		somaTotal += valor;
	}

	return somaTotal;
}
