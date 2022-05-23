import logging
import os.path


def numberLine(text):
    count = 0
    for symbol in text:
        if '\n' in symbol:
            count = count + 1
            
    return count + 1


def count_lines(data):
    from . import defaultCode
    res = [
        {"part":"1","lines":numberLine(defaultCode.text_code_1)},
        {"part":"2","lines":numberLine(data['code_1'])},
        {"part":"1","lines":numberLine(defaultCode.text_code_2)-1},
        {"part":"3","lines":numberLine(data['code_2'])},
        {"part":"4","lines":numberLine(data['code_3'])},
        {"part":"5","lines":numberLine(data['code_4'])},
        {"part":"6","lines":numberLine(data['code_5'])},
        {"part":"7","lines":numberLine(data['code_6'])},
        {"part":"8","lines":numberLine(data['code_7'])},
        {"part":"9","lines":numberLine(data['code_8'])},
        {"part":"1","lines":numberLine(defaultCode.text_code_3)}
    ]
    return res


def parse_log(file, numberLines):
    try:
        path = os.path.abspath(file)
        logging.info("PATH FILE WITH ERROR =" + path)
        f = open(path, 'r')
        output = f.read()

        lines = []
        line = ""
        for symbol in output:
            if '\n' not in line:
                line += symbol
            else:
                lines.append(line)
                line = ""

        res = []
        i = 0
        logging.info(lines)
        logging.info(len(lines))
        while i < len(lines):
            if "error" in lines[i]:
                index_line_error = lines[i].index(":") + 1
                index = lines[i].index(":", lines[i].index(":") + 1) + 1
                line_error = int(lines[i][index_line_error:index - 1])

                j = 0
                while line_error > numberLines[j]["lines"]:
                    line_error = line_error - numberLines[j]["lines"]
                    j = j + 1
                
                if numberLines[j]['part'] == '5': line_error = line_error + 1
                
                part_error = -1
                numberline_error = -1
                if numberLines[j]['part'] == '1':
                    if j == 0: numberline_error = line_error
                    elif j == 2: numberline_error = numberLines[0]["lines"] + line_error
                    elif j == 10: numberline_error = numberLines[0]["lines"] + numberLines[2]["lines"] + line_error + 3
                    part_error = "1"
                else:
                    part_error = numberLines[j]["part"]
                    numberline_error = line_error
                
                error_symbol_line = lines[i][index:]
                error_log = []
                i = i + 1
                index_log = lines[i].index("|")
                error_log.append(lines[i][index_log:])
                i = i + 1
                info = "\n"
                if len(res) == 0: info = ""
                info = info + "Part:" + str(part_error) + "\nLine:" + str(numberline_error) + ":" + str(error_symbol_line) + " " + str(error_log[0])

                if i < len(lines) :
                    index_log = lines[i].index("|")
                    error_log.append(lines[i][index_log:-1])
                    info = info + " " + str(error_log[1])
                res.append(info)
            i = i + 1
        f.close()
        return res
    except:
        logging.info("ERROR READING OUTPUT FILE WITH ERROR")
        return "code error"