// Function to calculate the total balance from a list of transactions
export const calculateTotalBalance = (transactions) => {
	return transactions.reduce((acc, transaction) => {
		return transaction.type === "income"
			? acc + transaction.amount
			: acc - transaction.amount;
	}, 0);
};

// Function to calculate total income from transactions
export const calculateTotalIncome = (transactions) => {
	return transactions
		.filter((transaction) => transaction.type === "income")
		.reduce((acc, transaction) => acc + transaction.amount, 0);
};

// Function to calculate total expenses from transactions
export const calculateTotalExpenses = (transactions) => {
	return transactions
		.filter((transaction) => transaction.type === "expense")
		.reduce((acc, transaction) => acc + transaction.amount, 0);
};

// Function to calculate savings (assuming savings = income - expenses)
export const calculateSavings = (transactions) => {
	const income = calculateTotalIncome(transactions);
	const expenses = calculateTotalExpenses(transactions);
	return income - expenses;
};

// You might want to calculate loan totals or specific filters for loans
export const calculateTotalLoanAmount = (loans) => {
	return loans.reduce((acc, loan) => acc + loan.amount, 0);
};

// Additional utility that might be useful, like formatting currency
export const formatCurrency = (amount, locale = "en-US", currency = "USD") => {
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency: currency,
	}).format(amount);
};
