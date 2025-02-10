export const formatRichText = (text: string) => {
  return text?.replaceAll('sandbox="" ', '')
}
