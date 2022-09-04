from fastapi import APIRouter

chat = APIRouter()

@chat.get('/chat/{chat_id}')
def get_chat_by_id(chat_id):
  return f"chat {chat_id}"

@chat.post('/chat/{chat_id}')
def post_message(chat_id, message):
  return f"your message to {chat_id} is {message}"

@chat.get('/chat')
def get_chats():
  return "chats list"
