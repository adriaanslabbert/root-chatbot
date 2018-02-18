# root-chatbot-webhook-nodejs

Root Webhook template for creating a Chat Bot using DialogFlow and the Root API.

The full Root api documentation can be found [here](https://app.root.co.za/docs/insurance/api)

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

## Simple DialogFlow Component

Follow the below steps in order to create a simple DialogFlow component and link it to our root-chatbot-webhook:

### 1. Create a new DialogFlow Agent

The DialogFlow Agent is essentially your Chat Bot.

<p align="center">
  <img src="https://user-images.githubusercontent.com/4396174/36353743-a1c4d5b6-14d2-11e8-807b-82b0774e948e.png" width="1000"/>
</p>

### 2. Edit your Agent's Welcome Intent

Your Agent's welcome intent is essentially the message that will launch your Chot Bot. Here you can also configure more useful and intuitive response message that will help to retrieve the first bit of information from your user.

<p align="center">
  <img src="https://user-images.githubusercontent.com/4396174/36353745-a3c7501e-14d2-11e8-8a51-3c209aa353a4.png" width="1000"/>
</p>

### 3. Create an Entity to store possible Device names

An Entity in DialogFlow is essentially a way of describing data elements expected from a user's message to your chat bot. In our case, we will only be creating a simple device Entity that will capture the entire device name. I would suggest that you expand upon this later in order to make your chat bot more user friendly. E.g. Consider breaking up the device name into Manufacturer, Model, Memory etc.

Add the device Entity and create some example device names that are found in the Root API.

<p align="center">
  <img src="https://user-images.githubusercontent.com/4396174/36353748-a6793264-14d2-11e8-8d49-5af9673e26e4.png" width="1000"/>
</p>

NB: Ensure that you select the 'Allow Automated expansion' box that will assist with training and expansion of your intent. 

### 4. Create your Quote intent

Here is where your Chat Bot magic lies. Start to think like a user interacting with your Insurance Chat Bot. 

This is the first piece of information that your Chat Bot is expecting. For simplicity sake, we would like to receive the Device name from the user. Add as many "User expressions" as you can think of, but be sure to indicate that the device text is of type @device. 

Set the devie parameter to 'Required' and add a prompt message to request the details if the member fails to supply them.

<p align="center">
  <img src="https://user-images.githubusercontent.com/4396174/36353751-a8aa1404-14d2-11e8-9960-1a161c38083e.png" width="1000"/>
</p>

### 5. Connecting your Chat Bot to the root-chatbot-webhook

We would now like our ChatBot to query our webhook in order to provide useful quote information to our users. This can be done through a webhook.

At this point your application needs to be hosted somewhere. Alternatively, you can create a secure url to your localhost server using [ngrok](https://ngrok.com/).

For now, we will set up a webhook directly to our /get-insurance-quote endpoint. However, you should explore the possibilities of redirecting webhook requests to different api endpoints based on the 'action name' of your intent. 

<p align="center">
  <img src="https://user-images.githubusercontent.com/4396174/36353752-aa94052c-14d2-11e8-8f16-1ec522057dc2.png" width="1000"/>
</p>

### 6. Connecting your Webhook to your Quote Intent

We now simply need to indicate that we would like our configured intent to use a Webhook fulfillment to respond to our users.

<p align="center">
  <img src="https://user-images.githubusercontent.com/4396174/36353754-ac7bb1dc-14d2-11e8-9115-aae6024761f2.png" width="1000"/>
</p>

## Powered By:

[![N|Solid](https://attachments-cdn.breezy.hr/74cb17e8-7a2a-4bff-a188-7b674e957a81/Black.png)](https://www.offerzen.com/)
[![N|Solid](https://root.co.za/images/social/twitter-default.jpg)](https://root.co.za)
