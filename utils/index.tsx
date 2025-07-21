export const categorys = [
	"Alimentação",
	"Doação",
	"Educação",
	"Entretenimento",
	"Imposto",
	"Investimentos",
	"Lazer",
	"Moradia",
	"Não previsto",
	"Outros",
	"Saúde",
	"Tecnologia",
	"Transporte",
	"Vestuário",
	"Viagens"
] as const;

export const months = [
	"Janeiro",
	"Fevereiro",
	"Marco",
	"Abril",
	"Maio",
	"Junho",
	"Julho",
	"Agosto",
	"Setembro",
	"Outubro",
	"Novembro",
	"Dezembro"
]

export const years = [
	2021,
	2022,
	2023,
	2024,
	2025,
	2026,
	2027,
	2028,
]

export const formatCurrency = (value: string) => {
	value = value.replace(/\D/g, "");
	value = (Number(value) / 100).toFixed(2) + "";
	value = value.replace(".", ",");
	value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
	return "R$ " + value;
  }

export const parseCurrencyString = (currencyString: string) => {
	let numberString = currencyString.replace("R$", "").trim();
	numberString = numberString.replace(/\./g, "");
	numberString = numberString.replace(",", ".");

	return parseFloat(numberString);
}

export const formatToCurrencyBRL = (amount: number) => {
	// Format the number to Brazilian Real currency
	return amount.toLocaleString('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});
}

export const currentDate = () => {
	const date = new Date();
  const currentMonth = months[date.getMonth()];
  const currentYear = date.getFullYear().toString();

	return {
		month: currentMonth,
		year: currentYear
	}
}
