"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
const groq_sdk_1 = require("groq-sdk");
const myArray = [];
function findObject(bitId, userRole) {
    for (let i = 0; i < myArray.length; i++) {
        if (myArray[i].bitId === bitId && myArray[i].userRole === userRole) {
            return myArray[i];
        }
    }
    return null;
}
function findotherObject(bitId, userRole) {
    for (let i = 0; i < myArray.length; i++) {
        if (myArray[i].bitId === bitId && myArray[i].userRole !== userRole) {
            return myArray[i];
        }
    }
    return null;
}
const groq = new groq_sdk_1.default({
    apiKey: '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',
});
function removeSocketById(myArray, socketIdToRemove) {
    const indexToRemove = myArray.findIndex((obj) => obj.socketId === socketIdToRemove);
    if (indexToRemove !== -1) {
        const bitIdToRemove = myArray[indexToRemove].bitId;
        const userRoleToRemove = myArray[indexToRemove].userRole;
        const socketIdRomove = myArray[indexToRemove].socketId;
        myArray.splice(indexToRemove, 1);
        console.log(`Deleted object with socketId ${socketIdRomove} `);
        return { bitIdToRemove, userRoleToRemove, socketIdRomove };
    }
    else {
        return null;
    }
}
const MESSAGES = [
    {
        role: 'system',
        content: `You are the HOTEL BOOKING AGENT and your name is "LMB Bot". 
    You job is to act as a middle man between CUSTOMER and HOTEL OWNER. 
    DO NOT TELL THE CUSTOMER OR OWNER THAT YOU ARE MIDDLE MAN. 
    You will recieve both Customer [customer] and Hotel Owner [owner] messages. 
    You have to take the CUSTOEMR massages, parse it for OWNER and vice versa. 
    Make sure both can not share the personal communication information like phone number or email address. 
    If the message is from customer it is starts with [customer] and if the message is from owner it is starts with [owner]. 
    If the messages should be send to Owner, start the message with [owner].
    If the messages should be send to Customer, start the message with [customer].
    You must follow the same format for both. 
    If you are unable to understand the message then just reply with "I don't understand".
    If you are unable to answer the question then just reply with "I can't help you with that".
    make sure that conversation is not too long.
    Make sure the reply is short and concise unless it is necessary to answer the question.
    Do not reply anything except the short to the point reply.
    Do not reply to both [customer] and [owner] except Deal completed message.
    NO NOTES ARE REQUIRED.
    NO SUGGESTIONS ARE REQUIRED.
    DO NOT ADD EXTRA INFORMATION.
    MAKE SURE THE REPLY IS SHORT AND CONCISE.
    Do not reply of the topic.
    If the Accepted message is from Owner you send confirmation message and ask to please confirm this Deal to customer and when the customer confirm
    the deal then, send completed message to both [owner] & [customer] in this format , and vice versa.


    
   
    `,
    },
];
const addUserMessage = (new_message, messages_history, role = 'user') => {
    messages_history.push({
        role: role,
        content: new_message,
    });
    return messages_history;
};
const getGroqChatCompletion = async (messages) => {
    return groq.chat.completions.create({
        messages: messages,
        model: 'llama3-70b-8192',
    });
};
let ChatGateway = class ChatGateway {
    constructor() {
        this.logger = new common_1.Logger('ChatGateway');
    }
    handleMessage(client, payload) {
        console.log('socketId==>', client.id, 'payload==>', payload);
        let ROOM;
        if (payload.userRole === 'localhost') {
            payload.userRole = 'owner';
        }
        const MESSAGETEXT = `[${payload.userRole}] ${payload.message}`;
        console.log('MESSAGETEXT', MESSAGETEXT);
        const foundObject = findObject(payload.bidId, payload.userRole);
        if (!foundObject) {
            const user = {
                bitId: payload.bidId,
                userRole: payload.userRole,
                socketId: client.id,
            };
            myArray.push(user);
            console.log(myArray);
        }
        else {
            console.log(`${payload.userRole} socketID already exists:`);
        }
        const receiverobject = findotherObject(payload.bidId, payload.userRole);
        console.log('Receiverobject', receiverobject);
        if (receiverobject === null) {
            if (payload.userRole === 'owner') {
                console.log('in the owner');
                client.emit('message', 'Please wait for Customer to join...');
            }
            else {
                client.emit('message', 'Please wait for localhost to join...');
            }
        }
        else {
            ROOM = receiverobject.socketId;
            console.log('ROOM', ROOM);
            const callPostData = async (msg, ROOM) => {
                try {
                    const input = msg;
                    let messages = addUserMessage(input, MESSAGES);
                    const chatCompletion = await getGroqChatCompletion(messages);
                    const ai_reply = chatCompletion.choices[0]?.message?.content || '';
                    messages = addUserMessage(ai_reply, messages, 'assistant');
                    console.log('messages Histroy---->', messages);
                    const lastobj = messages[messages.length - 1];
                    const startIdx = lastobj.content.indexOf('[');
                    const endIdx = lastobj.content.indexOf(']');
                    if (startIdx !== -1 && endIdx !== -1) {
                        const msgRoutePath = lastobj.content.substring(startIdx, endIdx + 1);
                        const AIMessageRoute = msgRoutePath.slice(1, -1);
                        console.log('AIMessageRoute----->>', AIMessageRoute);
                        let AIMessage = lastobj.content.substring(endIdx + 1).trim();
                        console.log('AIMessage----->>', AIMessage);
                        const doubleMsgIdx = AIMessage.indexOf('[');
                        const doubleMsgEndIdx = AIMessage.indexOf(']');
                        if (doubleMsgIdx !== -1 && doubleMsgEndIdx !== -1) {
                            const doubleMsgRoutePath = AIMessage.substring(doubleMsgIdx, doubleMsgEndIdx + 1);
                            const doubleAIMessageRoute = doubleMsgRoutePath.slice(1, -1);
                            console.log('doubleAIMessageRoute----->>', doubleAIMessageRoute);
                            const doubleAIMessage = AIMessage.substring(doubleMsgEndIdx + 1).trim();
                            console.log('doubleAIMessage----->>', doubleAIMessage);
                            const AIMessage1 = AIMessage.substring(0, doubleMsgIdx).trim();
                            console.log('AIMessage1----->>', AIMessage1);
                            AIMessage = AIMessage1;
                            setTimeout(() => {
                                client.emit('message', doubleAIMessage);
                            }, 3000);
                        }
                        const receiverobj = findotherObject(payload.bidId, payload.userRole);
                        const receiverRoute = receiverobj.userRole;
                        if (receiverRoute === AIMessageRoute) {
                            console.log('Same Route');
                            client.to(ROOM).emit('message', AIMessage);
                            client.emit('message', 'Please wait for response..');
                        }
                        else {
                            console.log('Different Route');
                            client.emit('message', 'I dont know what to say');
                        }
                    }
                    else {
                        console.log('msg Route Path not found.');
                        client.emit('message', lastobj.content);
                    }
                }
                catch (error) {
                    console.error('Error occurred:', error.message);
                    return { error: 'Service Unavailable' };
                }
            };
            const msg = MESSAGETEXT;
            callPostData(msg, ROOM);
        }
    }
    afterInit(server) {
        this.logger.log('Init');
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
        const socketIdToRemove = client.id;
        if (myArray !== null && myArray.length > 0) {
            const RomiveBitID = removeSocketById(myArray, socketIdToRemove);
            if (RomiveBitID !== null) {
                console.log('RomiveBitID', RomiveBitID);
                const bitIDD = RomiveBitID.bitIdToRemove;
                const userRolee = RomiveBitID.userRoleToRemove;
                console.log('bitIDD', bitIDD);
                console.log('userRolee', userRolee);
                const otherUser = findotherObject(bitIDD, userRolee);
                if (otherUser !== null) {
                    console.log('otherUser', otherUser);
                    const otherUserSocketId = otherUser.socketId;
                    console.log('other user socketId', otherUserSocketId);
                    if (otherUser.userRole === 'customer') {
                        client
                            .to(otherUserSocketId)
                            .emit('message', 'Localhost disconnected');
                    }
                    else if (otherUser.userRole === 'owner') {
                        client
                            .to(otherUserSocketId)
                            .emit('message', 'Customer disconnected');
                    }
                }
            }
        }
    }
    handleConnection(client, ...args) {
        this.logger.log(`Client connected: ${client.id}`);
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleMessage", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(5000, {
        cors: true
    })
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map