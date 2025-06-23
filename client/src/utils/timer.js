export function startCountdown(duration, onEnd) {
  let time = duration;
  const interval = setInterval(() => {
    time--;
    if (time <= 0) {
      clearInterval(interval);
      if (typeof onEnd === "function") {
        onEnd();
      }
    }
  }, 1000);
  return interval;
}
