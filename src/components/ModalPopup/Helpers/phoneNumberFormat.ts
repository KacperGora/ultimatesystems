export const formatPhoneNumber = (enteredPhoneNumber: string) => {
  if (!enteredPhoneNumber) return enteredPhoneNumber;
  const phoneNumber = enteredPhoneNumber.replace(/[^\d]/g, "");
  return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(
    3,
    6
  )} ${phoneNumber.slice(6, 9)}`;
};

