from channels.generic.websocket import WebsocketConsumer

GLOBAL_POSITION = 0


class PullConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        global GLOBAL_POSITION
        text_data_json = int(text_data)
        GLOBAL_POSITION += text_data_json

        self.send(text_data=str(GLOBAL_POSITION))