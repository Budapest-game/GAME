export default {
  header: 'Игра «Три в ряд»',
  descriptionStart: 'В игре требуется собрать 3 и более одинаковых элемента в ряд.',
  description: `Игровое поле размером N на N элементов. Условие завершения игры - окончание времени 
  (t секунд) или n ходов (перестановок). Можно менять местами элементы. Если в процессе смены местоположения 
  не получается три и более элемента в ряд, действие отменяется и элементы встают на прежнее место.
  Менять местами можно только элементы находящиеся рядом друг с другом по горизонтали
  или по вертикали. Взамен убывших элементов сверху в рандомном порядке появляются новые элементы.`,
  descriptionEnd: 'Результат пользователя - это количество «уничтоженных» элементов за время игры или n ходов.',
};
