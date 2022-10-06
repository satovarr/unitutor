
import firebase_admin
from firebase_admin import credentials, auth

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

# id_token comes from the client app (shown above)

def validateToken(id_token):
    try:
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        return uid
    except Exception as e:
        print("error", e)
        return False
