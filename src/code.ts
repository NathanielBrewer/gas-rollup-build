import { formatGreeting } from './greetings.js';

function onOpen(): void {
  const message: string = formatGreeting('Dev');
  console.log(message);
}