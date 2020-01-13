from django.utils.deprecation import MiddlewareMixin



class ACAO(MiddlewareMixin):
    def process_response(selfself , request,response):
        response['Access-Control-Allow-Origin'] = '*'
        return  response