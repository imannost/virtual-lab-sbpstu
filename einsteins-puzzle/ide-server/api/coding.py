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
    code = defaultCode.text_code_1 + data['code_1'] + defaultCode.text_code_2 + data['code_2'] + data['code_3'] + \
           data['code_4'] + data['code_5'] + data['code_6'] + data['code_7'] + data['code_8'] + defaultCode.text_code_3

    logging.basicConfig(format='%(asctime)s - %(message)s', level=logging.INFO)
    logging.info(code)

    from . import compiling
    output = compiling.compile_code(code)
    if output == "":
        logging.info("SUCCESS: output: " + output)
    else:
        logging.info("ERROR: output")

    logging.info("DELETING...")
    delete_file("program.cpp")
    delete_file("myfile")
    delete_file("out.txt")

    return output
