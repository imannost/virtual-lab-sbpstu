from flask import Flask, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route("/", methods=['POST'])
def get_result():
    data = request.get_json()

    from api import coding
    return {'result': coding.run_program(data)}


if __name__=="__main__":
    app.run(host='0.0.0.0', port=5000)
