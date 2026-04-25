// Parses recipe quantity input into a numeric value.
// Supports:
// - whole numbers ("1")
// - decimals ("1.5")
// - fractions ("1/2")
// - mixed numbers ("1 1/2")
// Returns null for invalid input.

export const parseQuantity = (value: string): number | null => {
  const trimmedValue = value.trim();

  if (!trimmedValue) return null;

  // Handle plain numbers
  const numberValue = Number(trimmedValue);

  if (!Number.isNaN(numberValue)) {
    return numberValue;
  }

  // Handle simple fractions
  const fractionParts = trimmedValue.split('/');

  if (fractionParts.length === 2) {
    const numerator = Number(fractionParts[0]);
    const denominator = Number(fractionParts[1]);

    // Validate numbers and prevent division by zero
    if (
      !Number.isNaN(numerator) &&
      !Number.isNaN(denominator) &&
      denominator !== 0
    ) {
      return numerator / denominator;
    }
  }

  // Handle mixed numbers
  const mixedParts = trimmedValue.split(' ');

  if (mixedParts.length === 2) {
    const whole = Number(mixedParts[0]);
    const fraction = mixedParts[1];

    const fractionParts = fraction.split('/');

    if (fractionParts.length === 2) {
      const numerator = Number(fractionParts[0]);
      const denominator = Number(fractionParts[1]);

      if (
        !Number.isNaN(whole) &&
        !Number.isNaN(numerator) &&
        !Number.isNaN(denominator) &&
        denominator !== 0
      ) {
        return whole + numerator / denominator;
      }
    }
  }

  return null;
};
