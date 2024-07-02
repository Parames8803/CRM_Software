export const generateRandomId = async () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  const timestamp = new Date().getTime();

  for (let i = 0; i < 6; i++) {
    const randomIndex = (timestamp + i) % characters.length;
    result += characters.charAt(randomIndex);
  }

  return result;
};
