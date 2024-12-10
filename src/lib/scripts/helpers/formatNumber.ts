const formatNumber = (value: number, maxDecimals: number) => {
	const valueString = value.toString();
	if (valueString.includes('.')) {
		const [integerPart, decimalPart] = valueString.split('.');
		if (decimalPart.length > maxDecimals) {
			return `${integerPart}.${decimalPart.slice(0, maxDecimals)}`;
		}
	}
	return valueString;
};

export default formatNumber;
