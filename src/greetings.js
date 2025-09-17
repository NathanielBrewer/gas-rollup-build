/**
 * Format a friendly greeting message.
 * @param {string} name
 * @returns {string}
 */
export function formatGreeting(name) {
  const message = `Hello, ${name}!`;
  console.log('Greeting generated:', message);
  return message;
}