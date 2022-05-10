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


def compile_code(data, numberLines):
    logging.info("SAVING FILES")
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
        except:
            logging.info("ERROR READING OUTPUT")
            from . import parsingLog
            result = parsingLog.parse_log("out.log", numberLines)
            
        logging.info("OUTPUT:")
        logging.info(result)
        return result
    else:
        return logging.info("DON'T HAVE FILE")
