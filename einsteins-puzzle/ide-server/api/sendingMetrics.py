import requests
import logging

nameGame = "Course Work Math Logic"

def send_time_metrics(time_start, time_end, token):
    url = "http://monitoring-service:8090/time"
    data = {"nameGame": nameGame,
            "timeStart": time_start,
            "timeFinish": time_end,
            "timeInGame": "",
            "token": token}
        
    try:
        requests.post(url, json=data)
        logging.info("Metric about timing was send")
    except:
        logging.info("ERROR: Metric about timing ")
        pass



def send_attept_metrics(attepmt, token):
    url =  "http://monitoring-service:8090/gameVictory"
    data = {"nameGame": nameGame,
            "metric": attepmt,
            "token": token}

    try: 
        requests.post(url, json=data)
        logging.info("Metric about attept was send")
    except: 
        logging.info("ERROR: Metric about attept")
        pass