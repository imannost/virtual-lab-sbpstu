from flask import Flask, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route("/api", methods=['POST'])
def get_result():
    data = request.get_json()

    from api import coding
    return {'result': coding.run_program(data)}
