from transformers import pipeline

summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
captioner = pipeline("image-to-text",model="Salesforce/blip-image-captioning-base")
pipe = pipeline("automatic-speech-recognition", "openai/whisper-large-v2")

def read_file(id):
    with open('files/' + str(id), 'rb') as f:
        file = f.read()
    return file

def summarize(id, fileType, url):
    if fileType == 'text':
        summarizer_text = summarizer(read_file(id).decode('utf-8'), max_length=100, do_sample=False)
        return summarizer_text[0]['summary_text']
    if fileType == 'image':
        captioner_text = captioner(f"files/{id}")
        return captioner_text[0]['generated_text']
    if fileType == 'audio':
        ext_text = pipe(f"files/{id}")['text']
        summarizer_text = summarizer(ext_text, max_length=100, do_sample=False)
        return summarizer_text[0]['summary_text']
    if fileType == 'video':
        pass
