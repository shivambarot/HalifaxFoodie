const Exception = require('../lib/exceptions');
const lex = require('../lib/lex-connection');
class ChatBotController {
    static async sendChat(req, res) {
        try {
            const params = {
                botAlias: '$LATEST', 
                botName: 'HalifaxFoodieBot',
                userId: req.body.lexUserId,
                inputText: req.body.chatInput,
                sessionAttributes: req.body.sessionAttributes
            };
            lex.postText(params, (err, data) => {
                if (err) {
                   console.log(err, err.stack);
                }
                if (data) {
                    var ch = []
                    if(data.message.includes('{"messages":[')){
                        let temp = JSON.parse(data.message)
                        for(let i in temp.messages){
                            ch.push({Owner: 'ChatBot', Message: temp.messages[i].value})
                        }
                    }
                    else{
                        ch.push({Owner: 'ChatBot', Message: data.message})
                    }
                   let dt = {
                       sessionAttributes : data.sessionAttributes,
                       chat : ch
                    }
                    res.sendResponse({
                        success: true,
                        message: 'chat sent!',
                        data: dt
                    })
                }
            });

        } catch (error) {
            console.error('Error in ChatController: send', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }

}

module.exports = ChatBotController;