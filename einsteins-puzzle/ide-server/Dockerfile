FROM ubuntu
COPY /buddy-2.4 .

WORKDIR /buddy-2.4
RUN chmod +x configure
RUN ./configure
RUN make
RUN make install

FROM python:3.10.0
WORKDIR /ide-server
RUN apt-get update -y
RUN apt-get install -y python3-pip
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["python", "-m", "flask", "run", "--host=0.0.0.0"]