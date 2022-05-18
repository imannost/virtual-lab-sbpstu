import requests
import logging

nameGame = "Course Work Math Logic"


def send_time_metrics(time_start, time_end, token):
    url = "http://195.209.230.3:20285/time"
    data = {"nameGame": nameGame,
            "timeStart": time_start,
            "timeFinish": time_end,
            "timeInGame": "",
            "email": token}
    requests.post(url, json=data)
    logging.info("Metric about timing was send")



def send_attept_metrics(attepmt, token):
    url = "http://195.209.230.3:20285/gameVictory"
    data = {"nameGame": nameGame,
            "metic": attepmt,
            "token": token}
    requests.post(url, json=data)
    logging.info("Metric about attept was send")