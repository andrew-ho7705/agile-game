import RPi.GPIO as GPIO
import time
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
GPIO.setmode(GPIO.BCM)
beamBreakerPin = 17
GPIO.setup(beamBreakerPin, GPIO.IN)

@app.route('/check-beam', methods=['GET'])
def check_beam():
    return str(GPIO.input(beamBreakerPin))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)