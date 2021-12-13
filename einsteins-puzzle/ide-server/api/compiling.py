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


def compile_code(data):
    logging.info("SAVING FILES")
    file_name = "program.cpp"
    output = save_file(file_name, data)
    if output:
        path = os.path.abspath(file_name)
        logging.info("FILE PATH = " + path)
        # compile code
        try:
            os.system("gcc " + path)
            logging.info("OUTPUT:" + output)
            return output
        except:
            logging.info("ERROR COMPILING CODE")
            return 0
    else:
        return logging.info("DON'T HAVE FILE")