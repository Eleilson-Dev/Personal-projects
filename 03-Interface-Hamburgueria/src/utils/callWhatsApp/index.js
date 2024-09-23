export const callWhatsApp = ({ phoneNumber, message }) => {
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
    message
  )}`;

  return whatsappUrl;
};
