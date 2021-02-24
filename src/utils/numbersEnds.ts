export default function numbersEnds(number:number, cases:string[]): string {
  const decCases = [2, 0, 1, 1, 1, 2];
  return cases[number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)]];
}
