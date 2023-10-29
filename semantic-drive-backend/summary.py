from transformers import pipeline

def read_file(id):
    with open('files/' + str(id), 'rb') as f:
        file = f.read()
    return file

def summarize(id, fileType, url):
    if fileType == 'text':
        summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
        summarizer_text = summarizer(read_file(id).decode('utf-8'), max_length=100, do_sample=False)
        return summarizer_text[0]['summary_text']
    if fileType == 'image':
        captioner = pipeline("image-to-text",model="Salesforce/blip-image-captioning-base") 
        captioner_text = captioner(f"files/{id}")
        return captioner_text[0]['generated_text']
    if fileType == 'audio':
        pass
    if fileType == 'video':
        pass
