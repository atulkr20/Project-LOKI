const deepPhrases = [
  "i-am-watching-you-sleep",
  "don-t-turn-on-the-lights",
  "i-am-already-inside",
  "you-forgot-to-lock-the-door",
  "i-can-hear-you-breathing",
  "stop-looking-for-me",
  "your-window-is-open",
  "i-am-right-behind-you",
  "you-look-better-while-sleeping",
  "don-t-scream-it-won-t-help",
  "i-know-where-you-hide",
  "your-heartbeat-is-loud",
  "it-will-be-over-soon",
  "i-found-your-spare-key",
  "the-closet-is-slightly-open",
  "i-am-closer-than-you-think",
  "why-are-you-trembling",
  "i-have-been-here-all-night",
  "the-basement-door-is-unlocked",
  "i-can-smell-your-fear",
  "don-t-look-under-the-bed",
  "we-are-alone-now",
  "i-recorded-everything",
  "it-s-time-to-wake-up",
  "there-is-no-escape-now"
];

export const generateSerialLink = () => {
  // Randomly select one phrase from the master list
  const phrase = deepPhrases[Math.floor(Math.random() * deepPhrases.length)];
  
  const hex = Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0');
  
  
  return `${phrase}-${hex}`;
};