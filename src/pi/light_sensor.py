from flask import Flask, jsonify
try:
    from ltr559 import LTR559
    ltr559 = LTR559()
except ImportError:
    import ltr559
from flask_cors import CORS
import time
import socket

app = Flask(__name__)
CORS(app)

s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.settimeout(0)
s.connect(('10.254.254.254', 1))
IP = s.getsockname()[0]
s.close()

@app.route('/check-light', methods=['GET'])
def check_light():
    initial_lux = ltr559.get_lux()
    time.sleep(0.25)
    current_lux = ltr559.get_lux()
    difference = abs(current_lux - initial_lux)
    return jsonify({'diff': str(difference), 'ip': IP})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
