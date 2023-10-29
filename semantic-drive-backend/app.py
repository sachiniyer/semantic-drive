from flask import Flask
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return "I love Flask"

# @app.route('/upload', methods=['POST'])
# def upload_file():
    # data = request.json()

# GET files
@app.route('/files', methods=['GET'])
def get_files():
    pass
    # file_ids = list(files.keys())

# Search Query (takes in string -> should give back list of file ids (capped to 3))
@app.route('/search/<query>', methods=['GET'])
def search(query):

    api_token = "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"
    API_URL = "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2"
    headers = {"Authorization": f"Bearer {api_token}"}

    def send(payload):
        response = requests.post(API_URL, headers=headers, json=payload)
        return response.json()
    
    # get list of file_ids, file_summaries
    file_ids = [1, 2, 3, 4]
    file_summaries = [
        """In the given monologue from "The Big Sick," Kumail expresses deep conflict and frustration towards his family's traditional expectations versus his desire for an American life. He questions why his family brought him to the United States if they expected him to maintain their cultural norms from back home. Kumail confesses that he doesn't follow religious practices, struggles with his beliefs, and can't conform to an arranged marriage. He discloses his love for a woman named Emily, who is gravely ill, and regrets not being able to share this with his family due to fear and cultural barriers. Ultimately, he expresses gratitude for his family but asserts his need to figure out his beliefs and life on his own terms.""",
        "The provided text outlines an assignment for a Big Data course, structured into seven tasks primarily utilizing Spark and other datasets. The tasks cover diverse data analyses. The first involves determining item quantities bought per day during a specific time range in a bakery dataset. The second task delves further into bakery sales, seeking the top items bought categorized by day part and day type. The third task focuses on counting entities in Durham County, NC, based on a specific description in a dataset. The fourth task involves analyzing population data to identify regions with the most significant population decrease between 1990 and 2000. The fifth and sixth tasks revolve around text analysis, performing word count exercises and identifying common bigrams in a provided text dataset. Additionally, an extra credit task involves using specific datasets to find the closest active food service restaurant to given coordinates and calculating the number of foreclosures within a 1-mile radius of that location. Each task comes with different point values contributing to the overall assessment of the students' abilities in data analysis, manipulation, and interpretation using various tools and datasets.",
        """The provided code utilizes the Python library "pwntools" to connect to a remote server and solve an ongoing challenge. It begins by sending the user's NETID to the specified server. The main loop continuously reads lines from the server and processes them. If the line ends with ' = ?\n', it extracts an arithmetic expression (composed of two operands and an operator) from the line and solves it.
        The function string_digit_to_num converts spelled-out digits in the form of words (ZERO, ONE, TWO, etc.) to their numerical equivalents (0, 1, 2, etc.) by iterating through the input string and replacing the word digits with their corresponding numerical representations. The script checks if the operands are in hexadecimal, binary, or spelled-out digits. If they are not numerical, it uses the custom function to convert them to integers. Then, it performs the arithmetic operation specified by the operator, sending the result back to the server. The lines printed during the loop aid in debugging and providing insights into the performed operations. Overall, the code is set up to solve arithmetic challenges and interact with the remote server based on the input it receives.""",
        """The syllabus delineates the structure and objectives of the "Intro to Machine Learning" course at NYU Tandon for Fall 2023. It aims to equip students with the foundational understanding and practical skills in modern machine learning. The course focuses on mathematically formulating problems in real-world applications, proposing algorithmic solutions, implementing machine learning models, and evaluating their performance. Prerequisites include knowledge in data structures, algorithms, probability theory, linear algebra, and proficiency in Python. Grading includes various components such as class participation, homework, quizzes, midterm exams, and a final project to be done in teams. Collaboration is encouraged, but academic integrity is emphasized, requiring original work and proper citation of sources. The syllabus emphasizes inclusivity, offering resources for diverse student needs, and underscores the importance of an open, supportive learning environment. It provides platforms for course-related content and interactions, fostering a comprehensive understanding of machine learning while stressing ethical and collaborative learning practices."""
    ]

    similarity = send(
    {
        "inputs": {
            "source_sentence": {query},
            "sentences": file_summaries
        }
    })

    similarity = [(similarity[i], i) for i in range(len(similarity))]
    similarity.sort(descending=True)
    return similarity[:3]       

if __name__ == '__main__':
    app.run(debug=True)
