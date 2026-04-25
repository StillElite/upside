export const formatQuantity = (quantity: number): string => {
  const whole = Math.floor(quantity);
  const decimal = quantity - whole;

  const FRACTIONS = [
    { value: 0.125, label: '1/8' },
    { value: 0.25, label: '1/4' },
    { value: 1 / 3, label: '1/3' },
    { value: 0.5, label: '1/2' },
    { value: 2 / 3, label: '2/3' },
    { value: 0.75, label: '3/4' },
  ];

  const tolerance = 0.03;

  const match = FRACTIONS.find(
    (fraction) => Math.abs(decimal - fraction.value) < tolerance,
  );

  if (whole && match) {
    return `${whole} ${match.label}`;
  }

  if (match) {
    return match.label;
  }

  if (whole) {
    return whole.toString();
  }

  return quantity.toString();
};
