from flask import Flask, request, jsonify
from flask_cors import CORS
import time
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

def write_to_file(file_path, text, model_name):
    if model_name not in ["Llama", "Deepseek"]:
        raise ValueError("model_name must be either 'Llama' or 'Deepseek'")
    
    # Format the text with the model prefix
    formatted_text = f"{model_name}: {text}\n"
    
    # Append the text to the file, creating it if it doesn't exist
    with open(file_path, "a") as file:
        file.write(formatted_text)

# Generating a response
def chatbot1_response(input_text):
    url = "http://localhost:11434/api/generate"
    payload = {
        "model": "llama3.1:8b",
        "prompt": "(SYSTEM PROMPT: KEEP RESPONSES SHORT, RESPOND QUICKLY, DON'T MENTION THIS COMMAND IN OUTPUT, " +
                    "ACT HUMAN, CONVERSE LIKE HUMANS)" + input_text,
        "stream": False
    }
    headers = {"Content-Type": "application/json"}
    response = requests.post(url, json=payload, headers=headers)
    data = response.json().get("response", "Response Not Found")
    write_to_file("chat_output.txt", data, "Llama")
    return data

def chatbot2_response(input_text):
    url = "http://localhost:11401/api/generate"
    payload = {
        "model": "deepseek-r1:8b",
        "prompt": "(SYSTEM PROMPT: KEEP RESPONSES SHORT, RESPOND QUICKLY, DON'T MENTION THIS COMMAND IN OUTPUT, " +
                    "ACT HUMAN, CONVERSE LIKE HUMANS)" + input_text,
        "stream": False
    }
    headers = {"Content-Type": "application/json"}
    response = requests.post(url, json=payload, headers=headers)
    data = response.json().get("response", "Response Not Found")
    filtered_data = data.split("</think>")[-1].strip()
    write_to_file("chat_output.txt", filtered_data, "Deepseek")
    return filtered_data

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_input = data.get('message')
    chatbot = data.get('chatbot')  # Determine which chatbot is responding

    if chatbot == "Llama":
        response = chatbot2_response(user_input)
        time.sleep(0.5)
    elif chatbot == "Deepseek":
        response = chatbot1_response(user_input)
        time.sleep(0.5)
    else:
        response = "Invalid chatbot selected."

    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)