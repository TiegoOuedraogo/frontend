const FormatCurrency = (amount, currencyCode = 'USD', locale = 'en-US') => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
    }).format(amount);
}


// Usage:
const priceUSD = FormatCurrency(1234.56, 'USD');
console.log(priceUSD); 

const priceEUR = FormatCurrency(1234.56, 'EUR', 'de-DE');
console.log(priceEUR); 

export default FormatCurrency;

