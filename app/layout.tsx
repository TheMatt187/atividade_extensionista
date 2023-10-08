import './globals.css';
import type { Metadata } from 'next';
import Sidebar from './components/sidebar';

export const metadata: Metadata = {
	title: 'Cuidando da minha Cidade',
	description: 'Ajudando você a criar um melhor lugar para se viver',
	icons: {
		icon: ['/favicon.ico?v=4'],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="pt-br"
			className={`text-black bg-white dark:text-white dark:bg-[#111010]`}
		>
			<body className="antialiased max-w-2xl mb-40 flex flex-col md:flex-row mx-4 mt-8 lg:mx-auto">
				<main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
					<Sidebar />
					{children}
				</main>
			</body>
		</html>
	);
}
