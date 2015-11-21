from flask import Flask
from flask import render_template, url_for

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/unary/')
@app.route('/unary/index')
def unary():
    # url_for('static', filename='style.css')
    # url_for('static', filename='test.json')
    # url_for('static', filename='site.js')
    return render_template('index.html')

if __name__ == '__main__':
    app.run()