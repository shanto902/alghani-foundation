export async function GET() {
  // Simulate fetching from database or external API
  const modalData = {
    shouldShowModal: true, // Control if modal should appear
    title: "Exclusive Offer!",
    message: "Get 20% off on your next purchase. Limited time only!",
  };

  return Response.json(modalData);
}
