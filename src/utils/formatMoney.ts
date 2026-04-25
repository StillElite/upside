export const formatMoney = (value: number): string => {
  if (value > 0 && value < 0.01) {
    return '< $0.01';
  }

  return `$${value.toFixed(2)}`;
};
