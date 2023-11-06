from flask import Flask
from flask_socketio import SocketIO, emit
import RPi.GPIO as GPIO

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")  # Enable CORS

GPIO.setmode(GPIO.BCM)
beamBreakerPin = 17
GPIO.setup(beamBreakerPin, GPIO.IN, pull_up_down=GPIO.PUD_UP)

@socketio.on('connect')
def handle_connect():
    while True:
        data = str(GPIO.input(beamBreakerPin))
        emit('beam_break', data)
        socketio.sleep(0.01)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5001)
#pip install flask-socketio