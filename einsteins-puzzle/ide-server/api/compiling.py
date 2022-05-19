import logging
import os.path


def save_file(name, data):
    try:
        f = open(name, 'w')
        for index in data:
            f.write(index)
        f.close()
        logging.info("SUCCESS SAVING FILE")
        return 1
    except:
        logging.info("ERROR SAVING FILE")
        return 0


def compile_code(data, numberLines, token):
    logging.info("SAVING FILES")
    attept = ""
    file_name = "program.cpp"
    output = save_file(file_name, data)
    if output:
        path = os.path.abspath(file_name)
        logging.info("PROGRAM FILE PATH = " + path)
        # compile code
        try:
            logging.info("COMPILING PROGRAM...")
            os.system("g++ -I/usr/local/include program.cpp -o myfile -L/usr/local/lib -lbdd 2> out.log")
        except:
            logging.info("ERROR COMPILING CODE")
        try:
            logging.info("RUNNING PROGRAM...")
            path = os.path.abspath("myfile")
            logging.info("PROJECT FILE PATH = " + path)
            os.system("./myfile")
        except:
            logging.info("ERROR RUNNING CODE")
        try:
            logging.info("READING OUTPUT...")
            path = os.path.abspath("out.txt")
            logging.info("OUTPUT FILE PATH = " + path)
            f = open(path, 'r')
            result = f.read()
            f.close()
            attept = "vic"
        except:
            logging.info("ERROR READING OUTPUT")
            attept = "def"
            from . import parsingLog
            result = parsingLog.parse_log("out.log", numberLines)
            
        logging.info("OUTPUT:")
        logging.info(result)
        try:
            from . import sendingMetrics
            sendingMetrics.send_time_metrics(attept, token)
        except:
            pass
        return result
    else:
        return logging.info("DON'T HAVE FILE")
