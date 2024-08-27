export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export function checkEvenOrOdd(number: number): boolean {
  if (number % 2 === 0) {
    return true;
  } else {
    return false;
  }
}

export function getRandomBlockerStage(
  useH1: boolean
): "H2" | "H1" | "H3" | string {
  const headers = ["H1", "H2", "H3"];

  if (useH1) {
    const randomIndex = Math.floor(Math.random() * headers.length);
    return headers[randomIndex];
  } else {
    const randomIndex = Math.floor(Math.random() * (headers.length - 1)) + 1;
    return headers[randomIndex];
  }
}
