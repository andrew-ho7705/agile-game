@app.route('/get-public-ip', methods=['GET'])
def get_public_ip():
    ip = requests.get('https://api.ipify.org').text
    return jsonify({'ip': ip})
