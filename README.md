# root-chatbot-webhook-nodejs

Root Webhook template for creating a Chat Bot using DialogFlow and the Root API.

The full Root api documentation can be found 

This is not an official Root project. 

## Configure Project

Open the project in your favorite IDE and edit the index.js file.

The following information will need to be added:

* Your Root CLIENT_ID
* Your Root CLIENT_SECRET

## Install

root-chatbot-webhook-nodejs requires [Node.js](https://nodejs.org/) v8.9.4 (LTS) to run.

Install the dependencies and start the express server:

```sh
$ cd root-chatbot-webhook-nodejs
$ npm install
$ npm start
```

## Testing

The Webhook will now be running locally on http://localhost:300.

In order to test the webhook from your rest client, use the below endpoint and request object:

Endpoint: http://localhost:3000/get-insurance-quote 

Request Object:

```json
{
  "result": {
    "parameters": {
      "device": "iPhone 6s 64GB LT"
    }
  }
}
```

## Powered By:

[![N|Solid](https://attachments-cdn.breezy.hr/74cb17e8-7a2a-4bff-a188-7b674e957a81/Black.png)](https://www.offerzen.com/)
[![N|Solid](https://root.co.za/images/social/twitter-default.jpg)](https://root.co.za)
