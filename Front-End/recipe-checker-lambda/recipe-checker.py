import boto3
import json
import requests
import os
import sys
import subprocess
# pip install custom package to /tmp/ and add to path
subprocess.call('pip3 install requests -t /tmp/ --no-cache-dir'.split(),
                stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
sys.path.insert(1, '/tmp/')
s3 = boto3.client('s3')


def lambda_handler(event, context):
    # TODO implement
    s3_event_data = event['Records'][0]['s3']
    bucket_name = s3_event_data['bucket']['name']
    object_key = s3_event_data['object']['key']
    print("Triggered for bucket: ", bucket_name, ", Key: ", object_key)

    object_from_s3 = s3.get_object(Bucket=bucket_name, Key=object_key)
    content_of_file = object_from_s3['Body'].read().decode('utf-8')
    json_file_content = json.loads(content_of_file)

    r_ml = requests.post(url='https://us-central1-serverlessproject-320719.cloudfunctions.net/check-recipe',
                         data={'message': json_file_content['recipe']})

    if r_ml.status_code == 200:
        r_ml_content = r_ml.json()
        sim_score_max = 0
        final_obj = {}
        for obj in r_ml_content:
            if obj['classification']['score'] > sim_score_max:
                json_file_content['category'] = obj['displayName']
                json_file_content['score'] = obj['classification']['score'] * 100
                sim_score_max = obj['classification']['score']

        print(json_file_content)

        API_ENDPOINT = "https://hfbackend-qzcrbvfi4q-ue.a.run.app/api/recipe/saveRecipe"
        r = requests.post(url=API_ENDPOINT, data=json_file_content)

        if r.status_code == 200:
            return {
                'statusCode': 200,
                'body': 'Saved'
            }
        else:
            return {
                'statusCode': 500,
                'body': "Not saved"
            }
    else:
        return {
            'statusCode': 500,
            'body': "Not saved"
        }
