# Need to be imported in all routes, by now.
from fastapi.templating import Jinja2Templates

templates = Jinja2Templates(directory="templates")
