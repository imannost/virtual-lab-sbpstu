# Задача Эйнштейна

## Запуск приложения
1. Клонируйте проект из репозитория.

### Docker
2. Сброка Docker образов для сервера и клиента с помощью Dockerfile
3. Запуск сервера на 5000 порту
```
docker run -p 5000:5000 -d <name-server-image>
```
Это обусловлено тем, что клиент слушает 5000 порт.
4. Запуск клиента на любом порту

### Напрямую на PC

**Клиент**

2. Установка зависимостей
```
cd ide-client
npm install
```
3. Запуск клиента
```
npm start
```

**Сервер**

4. Установка зависимостей
```
cd ..
cd ide-server
pip3 install -r requirements.txt
```

5. Установка библиотеки

    5.1. Скачать библиотеку [Ссылка](https://sourceforge.net/projects/buddy/files/buddy/BuDDy%202.4/)
    
    5.2. Разархивировать библиотеку 
    
    5.3. Перейти в папку библиотеки

    5.4. Выполнить команды
```
./configure
make
make install
```

6. Запуск сервера
```
. venv/bin/activate
flask run
```

Note: Возможна ошибка на сервере при компиляции проекта 

```
./a.out: error while loading shared libraries: libbdd.so.0: cannot open shared object file: No such file or directory
```
В таком случае переходим в папку библиотеки /buddy-2.4/src/.libs/, копируем файл ошибки в /usr/local/lib.
А также даем все права файлам в папках /usr/local/lib и /usr/local/include. Команда sudo chmod 777 namefile
