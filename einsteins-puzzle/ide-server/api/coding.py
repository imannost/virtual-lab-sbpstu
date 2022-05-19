from cmath import log
import logging
import os


def delete_file(name):
    try:
        os.remove(name)
        logging.info(name + ": FILE DELETED")
    except:
        logging.info(name + ": ERROR DELETING FILE")


def run_program(data):
    from . import defaultCode
    code = defaultCode.text_code_1 + "\n" + data['code_1'] + "\n" + defaultCode.text_code_2 + "\n" + data['code_2'] + data['code_3'] + \
           data['code_4'] + data['code_5'] + data['code_6'] + data['code_7'] + data['code_8'] + "\n" + defaultCode.text_code_3
    from . import parsingLog
    numberLines = parsingLog.count_lines(data)

    logging.basicConfig(format='%(asctime)s - %(message)s', level=logging.INFO, filename="session-token-"+data['token']+".log")
    logging.info("--------------------------------------------------------------------")
    logging.info(data['token'])
    logging.info("--------------------------------------------------------------------")
    logging.info(code)
    try:
        from . import sendingMetrics
        sendingMetrics.send_time_metrics(data['time_start'], data['time_end'], data['token'])
    except:
        pass
    
    from . import compiling
    output = "Unknown error"
    try:
        output = compiling.compile_code(code, numberLines, data['token'])
        logging.info("DELETING...")
        delete_file("program.cpp")
        delete_file("myfile")
        delete_file("out.txt")
        delete_file("out.log")
        return output
    except:
        return "Unknown error"
