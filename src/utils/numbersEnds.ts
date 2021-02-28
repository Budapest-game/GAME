/*
Выбирает необходимое числительное из массива cases(3 формы, прим:['Ответ', 'Ответа', 'Ответов'])
для числа number
1 Ответ 2 Ответа 3 Ответа 4 Ответа и тд
*/
export default function numbersEnds(number:number, cases:string[]): string {
  const decCases = [2, 0, 1, 1, 1, 2];
  return cases[number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)]];
}
