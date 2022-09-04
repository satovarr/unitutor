from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from config.db import conn
from templates.templates import templates

register = APIRouter()

@register.get('/register', response_class=HTMLResponse)
def get_register(request: Request):
  context = {'request': request}
  return templates.TemplateResponse("register.html", context)