"use client";

export const CallUsButton = () => {
  const phoneNumber = "+918788561680";

  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <button
      onClick={handleCallClick}
      className="call-floating-btn"
      title="Call VJ Rentals Support"
      aria-label="Call Us"
    >
      <span className="call-btn-icon">📞</span>
      <span className="call-btn-text">Call Us</span>
    </button>
  );
};
