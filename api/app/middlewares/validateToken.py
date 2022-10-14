
import profile
import firebase_admin
from firebase_admin import credentials, auth
from sqlalchemy import true

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

# id_token comes from the client app (shown above)


def validate_token(id_token):
    try:
        # decoded_token = auth.verify_id_token(id_token["accessToken"])
        # uid = decoded_token['uid']
        uid = "1"
        print(uid)
        return uid
    except Exception as e:
        print("error", e)
        return False