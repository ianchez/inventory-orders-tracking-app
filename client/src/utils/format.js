export const formatPrice = (price) => {
  if (!price) return '';

  // format thousands with commas
  const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `$${formattedPrice}`;
}

export const formatTax = (tax) => {
  if (!tax) return '';
  return `${tax}%`;
}