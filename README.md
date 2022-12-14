# API for wishlists BuyOrGive web application


## Stack
TypeScript
PostgreSQL
Nest.js


##Functionality
В сервисе каждый зарегистрированный пользователь может рассказать о том, какой подарок он бы хотел получить, а также скинуться на подарок для другого пользователя, указав сумму, которую готов на это потратить.

Без регистрации доступен просмотр главной с лентой подарков (40 последних и 20 популярных подарков).

После регистрации:

добавление или изменение (только если никто еще не скинулся) подарков
редактирование профиля
просмотр профилей и "хотелок" других пользователей
поиск пользователей по имени пользователя или почте
заявка для желающих скинуться на подарок
копирование подарка
Создание базы данных
CREATE USER student WITH PASSWORD 'student';
CREATE DATABASE kupipodariday;
GRANT ALL PRIVILEGES ON DATABASE kupipodariday TO student;

## To start the project:
- clone repository
- run npm install to install dependencies
- npm run start:dev to start application in dev mode
