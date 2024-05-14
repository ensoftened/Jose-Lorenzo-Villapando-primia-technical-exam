const  decimalToFraction = (decimal: number) => {
    // Convert the decimal to a fraction
    let numerator = Math.round(decimal * 100000); // Multiply by 100000 to handle more decimal places
    let denominator = 100000;

    // Find the greatest common divisor (GCD) to simplify the fraction
    const gcd :
    
    
     any = function(a:any, b: any) {
        if (!b) {
            return a;
        }
        return gcd(b, a % b);
    };
    const divisor = gcd(numerator, denominator);

    // Simplify the fraction
    numerator /= divisor;
    denominator /= divisor;

    // Separate the whole number part
    const whole = Math.floor(numerator / denominator);
    numerator %= denominator;

    // Build the fraction string
    let fractionString = "";
    if (whole !== 0) {
        fractionString += whole.toString() + " ";
    }
    if (numerator !== 0) {
        fractionString += numerator.toString() + "/" + denominator.toString();
    }

    return fractionString;
}

export default decimalToFraction