# Multi-Agent System for LLM Communication and UI Display

## Project Overview
This project aims to design a system where two distinct local Large Language Models (LLMs) communicate and engage in conversations, with their dialogue displayed in a user interface (UI). The goal is to explore AI-to-AI communication and provide an interactive platform to monitor and visualize their interactions.

## Features
- **LLM Communication:** Two distinct local LLMs engage in ongoing conversations.
- **Real-time Updates:** The UI updates in real-time or near real-time to display the conversation.
- **User-Friendly Interface:** A clean and intuitive interface for visualizing AI interactions.
- **Customizable Parameters:** Configure conversation parameters such as context retention, interaction length, and topics.

## Project Architecture
The system consists of three main components:

1. **Frontend (React + Vite):**
   - Provides the user interface to display LLM conversations.
   - Real-time updates for seamless interaction display.

2. **Backend (Flask):**
   - Handles communication between the front end and the LLMs.
   - Manages API requests and message passing between the two models.

3. **LLM Integration:**
   - Connects to two distinct LLMs via available local APIs (e.g., OpenAI API, Anthropic API, or Google PaLM).

## Technologies Used
- **Frontend:** React, Vite
- **Backend:** Flask (Python)
- **APIs:** Local LLM APIs (e.g., OpenAI, Anthropic, Google PaLM)
- **Other Tools:** Python's `requests` for API requests, `CORS` for real-time cross-origin updates

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (for npm)
- Python 3.12+ (not guaranteed to work on past versions)
- Virtual environment tool (optional but recommended)
- Docker

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # For Linux/Mac
   venv\Scripts\activate     # For Windows
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the Flask backend:
   ```bash
   python main.py
   ```
   
### Frontend Setup
1. Open a new terminal window
2. Navigate to the frontend directory:
   ```bash
   cd client
3. Install dependencies
   ```bash
   npm install
4. Start the development server
   ```bash
   npm run dev

### Setting up a Docker container
1. Install a CPU-only container Docker running Ollama
   ```bash
   docker run -d -v ollama:/root/.ollama -p 11401:11434 --name ollama ollama/ollama
2. Start the container (if not already started)
   ```bash
   docker start <container_id>
3. Open a bash terminal inside the container to start the Ollama model
   ```bash
   docker exec -it <container_id> bash
4. [Optional] Install/Import a model from Ollama's library
   ```bash
   ollama pull <model_name>
5. Run the model
   ```bash
   ollama run <model_name>

## Usage
1. Start both the backend and frontend servers.
2. Access the UI at http://localhost:5173.
3. Ask a question to start the conversation
4. Watch as the two LLMs engage in a dynamic conversation.

## Configuration
1. Modify main.py to change conversation logic and LLM parameters.
2. Customize the UI in the React components.

## Example Conversation Display
```vbnet
LLM1: What are your thoughts on the future of AI?
LLM2: AI will continue to evolve and augment human capabilities in meaningful ways.
```

## Folder Structure
```css
project-root/
├── server/
|   └── venv/
│       └── main.py
├── client/
|   └── public/
│   └── src/
│       └── components/
├── requirements.txt
└── README.md
```

## Future Enhancements
* Support for more than two LLMs.
* Advanced UI customization.
* Conversation logging and analysis.
* Enhanced error handling for API requests.

## License
This project is licensed under the MIT License

## Contact
For questions/comments/suggestions please reach out to me on GitHub   
