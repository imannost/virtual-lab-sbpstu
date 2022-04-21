# FROM ubuntu as lib-inst


FROM python:3.10.0 as server-run
WORKDIR /ide-server
RUN apt-get update -y
RUN apt-get install -y python3-pip
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

RUN chmod +x buddy-2.4/configure
RUN ./buddy-2.4/configure
RUN make
RUN make install
RUN chmod -R 755 /usr/local/lib
RUN chmod -R 755 /usr/local/include

RUN cd ..
ENV LD_LIBRARY_PATH "/usr/local/lib"

WORKDIR /ide-server
RUN export LD_LIBRARY_PATH

CMD ["python", "-m", "flask", "run", "--host=0.0.0.0"]