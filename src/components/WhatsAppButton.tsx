"use client";

export const WhatsAppButton = () => {
  const phoneNumber = "918788561680";
  const message = "Hi VJ Rentals! I'm interested in booking a car.";

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="whatsapp-floating-btn"
      title="Chat with us on WhatsApp"
      aria-label="WhatsApp"
    >
      💬
    </button>
  );
};
