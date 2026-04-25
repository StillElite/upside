export const formatUnit = (unit: string, quantity: number) => {
  if (unit === 'cup') {
    return quantity > 1 ? 'cups' : 'cup';
  }

  return unit;
};
