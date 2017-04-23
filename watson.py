import json
from os.path import join, dirname
from watson_developer_cloud import SpeechToTextV1
from watson_developer_cloud import PersonalityInsightsV2
from watson_developer_cloud import ToneAnalyzerV3

audio_loc = './name.wav'

speech_to_text = SpeechToTextV1(username= "5dec914b-d438-4019-bcc0-b9e02ae49618",password= "wW2ungaT1roU", x_watson_learning_opt_out=False)

tone_analyzer = ToneAnalyzerV3(username= "587531d3-83dc-484e-8c68-81ce41b135e6",password= "sTzXe52DxZHK",version='2016-05-19')

# personality_insights = PersonalityInsightsV2(username= "4f54eced-2182-4e0e-86e4-b8581872b104",password= "zhJkYY0Fg0NL")


def transcribe(audio_loc):
	with open(audio_loc,'rb') as audio_file:
		transcription = speech_to_text.recognize(
			audio_file, content_type='audio/wav', timestamps=True,model='en-US_BroadbandModel',
			word_confidence=True,continuous = True)
		# print(transcription)
		transcript = transcription['results'][0]['alternatives'][0]['transcript']
		return transcript

transcript = transcribe(audio_loc)

print("got it")
def analyze_tones(transcript):
	tone_analysis = tone_analyzer.tone(text=transcript)
	return tone_analysis

analysis = analyze_tones(transcript)
all_three = analysis['document_tone']['tone_categories']
emotion = all_three[0]
language = all_three[1]
social = all_three[2]

print(emotion['tones'] ) # Contains a dict of the different tones and scores for emotions tones.