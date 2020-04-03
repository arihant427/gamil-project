For running the project just need to run the below command : node server.js

There is two API that I create:
1: For getting the message Id from GMAIL in bulk
2. For getting the message body and sender detail of any particular message 


Request type: GET 
Request Param: size (OPTIONAL: Integer type No of message we want to see -> default is 10)
API: localhost:6002/users/list?size=10

Sample Request: 
curl --location --request GET 'localhost:6002/users/list?size=10'

Response:
[
    "{\"id\":\"17140ee58307adc4\",\"threadId\":\"17140ee58307adc4\"}",
    "{\"id\":\"1713e74dde0ee1f4\",\"threadId\":\"1713e74dde0ee1f4\"}",
    "{\"id\":\"1713ac99f19f4499\",\"threadId\":\"1713ac99f19f4499\"}",
    "{\"id\":\"17139bcad427d5b1\",\"threadId\":\"17139bcad427d5b1\"}",
    "{\"id\":\"17136b119d58473f\",\"threadId\":\"17136b119d58473f\"}",
    "{\"id\":\"17136abae8402368\",\"threadId\":\"17136abae8402368\"}",
    "{\"id\":\"17129ddab5ac6f53\",\"threadId\":\"17129ddab5ac6f53\"}",
    "{\"id\":\"17129d54a7cb5fff\",\"threadId\":\"17129d54a7cb5fff\"}",
    "{\"id\":\"17127f46d97e995d\",\"threadId\":\"17127f46d97e995d\"}",
    "{\"id\":\"17127b013a8a4a95\",\"threadId\":\"17127b013a8a4a95\"}"
]

=====================================================================================================================================

Request type: GET 
Request Param: messageId (MANADATORY: String type Message Id)
messageId is the id that we get in previos api

API: localhost:6002/users/get/message?messageId=1713ac99f19f4499

Sample Request: 
curl --location --request GET 'localhost:6002/users/get/message?messageId=1713ac99f19f4499'

Response:

{
    "from": "Ola <noreply@olacabs.com>",
    "to": "jainanshul428@gmail.com",
    "body": "Innovation lies at the heart of everything we do here at Ola Foods. We offer deliciously unique experiences by experimenting with dishes in ways you&#39;ve never imagined. Logo Innovation lies at the"
}
