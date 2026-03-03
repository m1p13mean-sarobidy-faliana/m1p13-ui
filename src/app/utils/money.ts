export const printMoney = (value: number) => {
  const formatted = new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
  return `${value.toLocaleString().replace(/,/g, '_') || 0} Ar`;
};
