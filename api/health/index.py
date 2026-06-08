try:
    from api.index import app
except ModuleNotFoundError:
    from index import app

