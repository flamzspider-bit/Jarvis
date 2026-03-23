from flask import Flask, request, jsonify
import datetime
import webbrowser
import os

app = Flask(__name__)

@app.route("/command", methods=["POST"])
def command():
    data = request.get_json()
    cmd = data["cmd"].lower()

    # TIME
    if "time" in cmd:
        t = datetime.datetime.now().strftime("%H:%M:%S")
        return jsonify({"reply": f"Time is {t}"})

    # WEBSITES
    elif "youtube" in cmd:
        webbrowser.open("https://youtube.com")
        return jsonify({"reply": "Opening YouTube"})

    elif "google" in cmd:
        webbrowser.open("https://google.com")
        return jsonify({"reply": "Opening Google"})

    # APPS
    elif "notepad" in cmd:
        os.system("notepad")
        return jsonify({"reply": "Opening Notepad"})

    elif "calculator" in cmd:
        os.system("calc")
        return jsonify({"reply": "Opening Calculator"})

    # GREETING
    elif "hello" in cmd:
        return jsonify({"reply": "Hello Sanjay, I am Jarvis. Ready to assist you."})

    else:
        return jsonify({"reply": "Command not recognized, but I am learning."})

if __name__ == "__main__":
    app.run(debug=True)
