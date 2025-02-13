export const formatRichText = (text: string) => {
  return text?.replaceAll('sandbox="" ', '')
}

export const formatPhoneNumber = (number: string) => {
  const digits = number.replace(/\D/g, "");
  if (digits.length < 9) return number;
  return `+${digits.slice(0, 3)} (${digits.slice(3, 5)}) ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10, 12)}`;
};

export const truncateText = (text: string, wordLimit: number = 20): string => {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
};
