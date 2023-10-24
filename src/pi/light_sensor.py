from flask import Flask
try:
    from ltr559 import LTR559
    ltr559 = LTR559()
except ImportError:
    import ltr559
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)

@app.route('/check-light', methods=['GET'])
def check_light():
    initial_lux = ltr559.get_lux()
    time.sleep(0.25)
    current_lux = ltr559.get_lux()
    difference = abs(current_lux - initial_lux)
    return str(difference)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
