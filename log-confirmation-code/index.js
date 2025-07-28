exports.handler = async (event) => {
  const code = event.request.codeParameter;
  console.log("🟡 Confirmation Code Sent:", code);
  return event;
};