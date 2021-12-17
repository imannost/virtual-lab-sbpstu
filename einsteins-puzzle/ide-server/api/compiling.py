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
            logging.info("RUNNING PROGRAM...")
            os.system("g++ -I/usr/local/include" + path + "-o myfile -L/usr/local/lib -lbdd")
            os.system("./myfile")
        except:
            logging.info("ERROR COMPILING CODE")
        f = open('out.txt', 'r')
        result = f.read()
        f.close()
        logging.info("OUTPUT:")
        logging.info(result)
        return result
    else:
        return logging.info("DON'T HAVE FILE")
