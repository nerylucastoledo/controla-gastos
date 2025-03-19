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

export const fetcher = async (url: string) => {
	return fetch(url, {
	  method: 'GET',
	  credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': sessionStorage.getItem('token') || '',
		},
	}).then((res) => {
		if (res.ok) { 
			return res.json()
		}

		if (res.status === 403 || res.status === 401) {
			throw new Error("forbidden")
		}
		
		throw new Error("Ocorreu um erro interno.")
	}).catch(async (err) => {
		sessionStorage.clear()
		throw err;
	});
}

export const fetcherPost = async <T, R>(url: string, method: string, body?: T): Promise<R> => {
	const request = await fetch(url, {
		method,
		credentials: 'include',
		headers: {
			"Content-Type": "application/json",
			'Authorization': sessionStorage.getItem('token') || '',
		},
		body: JSON.stringify(body),
	}).then(async (res) => {
		const response = await res.json();

		if (res.ok) {
			return response;
		}

		throw new Error(response.message);
	}).catch(async (err) => {
		return {
			error: true,
			message: err.message
		}
	});

	const response = await request;
	return response;
};