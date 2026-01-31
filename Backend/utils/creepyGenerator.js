const deepPhrases = [
  "still-watching",
  "dont-turn",
  "already-inside",
  "door-unlocked",
  "heard-breathing",
  "stop-looking",
  "window-open",
  "behind-you",
  "better-sleeping",
  "dont-scream",
  "know-your-hide",
  "heartbeat-loud",
  "almost-over",
  "spare-key-found",
  "closet-open",
  "closer-now",
  "why-trembling",
  "here-all-night",
  "basement-open",
  "smell-fear",
  "dont-look",
  "alone-now",
  "recorded-you",
  "time-to-wake",
  "no-escape"
];


export const generateSerialLink = () => {
  // Randomly select one phrase from the master list
  const phrase = deepPhrases[Math.floor(Math.random() * deepPhrases.length)];
  
  const hex = Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0');
  
  
  return `${phrase}-${hex}`;
};