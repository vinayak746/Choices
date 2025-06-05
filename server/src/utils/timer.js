export function startCountdown(duration, onEnd) {
  let time = duration;
  const interval = setInterval(() => {
    time--;
    if (time <= 0) {
      clearInterval(interval);
      onEnd();
    }
  }, 1000);
  return interval;
}
