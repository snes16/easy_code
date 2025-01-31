
# Rick And Morty Web App

Тестовый проект на Vue.js с использованием открытого API https://rickandmortyapi.com/


## Демо проекта

Посмотреть демо-версию проекта можно по следующей ссылке:

https://sensational-crepe-be43de.netlify.app/

Видео в лучшем качестве: https://www.youtube.com/watch?v=ACSNxrH471Q

## Технологии

Vue.js, Vuex, Jest, Vue Test Utils, Docker


## Запуск проекта

### Локальный запуск

Чтобы запустить проект, установим зависимости:

```bash
  npm install
```

После установки зависимостей, можем запустить проект в режиме разработки:

```bash
  npm run serve
```

### Запуск проекта Docker

Создайте Docker-образ:

```bash
docker build -t rick-and-morty-app .
```

Запустите контейнер:

```bash
docker run -p 8080:80 rick-and-morty-app
```

Теперь приложение доступно по адресу http://localhost:8080.



