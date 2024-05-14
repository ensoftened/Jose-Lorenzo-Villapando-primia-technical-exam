const fractionToDecimal = (fractionString: string) => {
       // Split the fraction string into whole number and fraction parts
    const parts = fractionString.split(' ');
    let whole = 0;
    let numerator = 0;
    let denominator = 1;

    // If there are two parts, parse the whole number and fraction separately
    if (parts.length === 2) {
        whole = parseInt(parts[0]);
        const fractionParts = parts[1].split('/');
        numerator = parseInt(fractionParts[0]);
        denominator = parseInt(fractionParts[1]);
    } else {
        // If only one part, parse the fraction only
        const fractionParts = parts[0].split('/');
        numerator = parseInt(fractionParts[0]);
        denominator = parseInt(fractionParts[1]);
    }

    // Calculate the decimal value
    const decimal = whole + numerator / denominator;
    return decimal;
}

export default fractionToDecimal