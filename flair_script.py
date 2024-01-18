import sys
import json
import flair
import time

from flair.models import SequenceTagger
from flair.data import Sentence

flair.device = "cuda"

# Load tagger
start_time = time.time()
tagger = SequenceTagger.load("flair/pos-english-fast")
print(f"Time taken to load tagger: {time.time() - start_time} seconds")

# Read sentence from stdin
sentence_text = sys.argv[1]

# Make example sentence
start_time = time.time()
sentence_xd = Sentence(sentence_text)
print(f"Time taken to create sentence: {time.time() - start_time} seconds")

# Predict NER tags
start_time = time.time()
tagger.predict(sentence_xd)
print(f"Time taken to predict NER tags: {time.time() - start_time} seconds")

# Prepare result as a list of dictionaries
start_time = time.time()
result = [
    {"word": token.text, "pos": token.get_labels("pos")[0].value}
    for token in sentence_xd
]
print(f"Time taken to prepare result: {time.time() - start_time} seconds")

# Output only the JSON without any additional log statements
print(json.dumps(result))
