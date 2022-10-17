import firebase_admin
from firebase_admin import credentials, auth

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

# id_token comes from the client app (shown above)


def validate_token(id_token):
    try:
        decoded_token = auth.verify_id_token(id_token["accessToken"])
        print(decoded_token)
        uid = decoded_token['uid']
        print(uid)
        return uid
    except Exception as e:
        print("Invalid firebase Token. default value returned. ", e)
        return "4"