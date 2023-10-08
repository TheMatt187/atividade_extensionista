import ChartGraphic from './components/chart';
import Text from './components/text';
import { calcularTotal, fetchData } from './lib/fetchData';

export default async function Home() {
	const dataExpenses = await fetchData(url('despesa'));
	const dataRevenues = await fetchData(url('receita'));
	const totalExpenses = calcularTotal(dataExpenses).toLocaleString('pt-br');
	const totalRevenues = calcularTotal(dataRevenues).toLocaleString('pt-br');

	return (
		<section className="flex justify-center flex-col items-center">
			<h1 className="font-bold text-2xl mb-8 tracking-tighter">
				Cuidando de Minha Cidade
			</h1>
			<p className="prose prose-neutral dark:prose-invert">
				Transformando sua cidade em melhor lugar para todos! 😊
			</p>
			<div className="flex flex-col gap-4 my-4 items-center justify-center">
				<h2 className="text-emerald-500 text-2xl">Receitas</h2>
				<h3 className="text-emerald-500 text-xl">Total: R$ {totalRevenues}</h3>
				<ChartGraphic
					dataGraphic={dataRevenues}
					backgroudColor="rgb(153,204,50)"
					borderColor="rgb(112,219,147)"
					label="Receitas"
				/>
				<h2 className="text-red-700 text-2xl">Despesas</h2>
				<h3 className="text-red-700 text-xl">Total: R$ {totalExpenses}</h3>
				<ChartGraphic
					dataGraphic={dataExpenses}
					backgroudColor="rgb(220,20,60)"
					borderColor="rgb(178,34,34)"
					label="Despesas"
				/>
			</div>
			<Text />
		</section>
	);
}

function url(name: string) {
	const date = new Date();
	return `https://transparencia.e-publica.net/epublica-portal/rest/mafra/api/v1/${name}?periodo_inicial=${
		date.getMonth() + 1
	}/${date.getFullYear()}&periodo_final=${
		date.getMonth() + 1
	}/${date.getFullYear()}&codigo_unidade=1`;
}
