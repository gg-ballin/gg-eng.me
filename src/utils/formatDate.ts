export const formatDate = (date: Date, locale: string) => {
  // Extract date components to avoid timezone issues
  // When date is parsed from frontmatter (YYYY-MM-DD), it may be interpreted as UTC midnight
  // We extract the date components and format them directly
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  
  // Create a date string in ISO format and parse it as local time
  const localDate = new Date(year, month, day);
  
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(localDate);
};