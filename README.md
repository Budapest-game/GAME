# Три в ряд
## Логика  
Собрать 3 и более одинаковых элемента в ряд.
## Шаблоны страниц  
https://www.figma.com/file/Q4k80uj2TfDdDGHBdo5paa/Game?node-id=0%3A1 
## Механика
Игровое поле размером N на N элементов.

Условие завершения игры - окончание времени(t секунд) или N ходов(перестановок).

Можно менять местами элементы. Если в процессе смены местоположения не получается три и более элемента в ряд, действие отменяется и элементы встают на прежнее место. Менять местами можно только элементы находящиеся рядом друг с другом по горизонтали или вертикали. Взамен убывших элементов сверху в рандомном порядке появляются новые элементы.

Результат пользователя это количество "уничтоженных" элементов за время игры или N ходов.

## HEROKU
Web URL:        https://morning-chamber-87005.herokuapp.com/
## Полезное  
npm run lint - линтинг *.ts  в директориях  ./src/  ./server/ ./webpack   
npm run lint-fix - фикс *.ts    в директориях  ./src/  ./server/ ./webpack
npm run build-configs сборка конфигов webpack   
npm run build-server  сборка сервера    
npm run webpack-client - сборка клиентской части в /dist/static      
npm run webpack-ssr - сборка ssr части в /dist/ssr    
npm run build-all - сборка всего    
npm run start - сборка сервера, бандлов и старт сервера   
npm run test - тесты jest   

## Запуск HTTPS на локальной машине
Для тестов на локальной машине нужно добавить в host запись:    
127.0.0.1 test.ya-praktikum.tech    
Далее в браузере приложение можно будет открывать по:           
https://test.ya-praktikum.tech:8080
