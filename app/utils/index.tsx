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

export const parseCurrencyString = (currencyString: string) => {
	let numberString = currencyString.replace("R$", "").trim(); // Remove the currency symbol (e.g., "R$") and trim whitespace
	numberString = numberString.replace(/\./g, ""); // // Remove thousand separators (.)
	numberString = numberString.replace(",", "."); // // Replace the decimal separator (,) with a dot (.)
	
	return parseFloat(numberString); // Convert the cleaned string to a float
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
