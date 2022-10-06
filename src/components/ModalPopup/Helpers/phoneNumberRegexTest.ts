export const phoneNumberRegexTest = (value: string): Boolean => {
  return /\d{3}[ ]?\d{3}[ ]?\d{3}(?!\w)/.test(value);
};
