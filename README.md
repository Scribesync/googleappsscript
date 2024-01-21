# Kindle Email Processor README

This Google Apps Script automatically scans your Gmail for emails from Amazon Kindle (specifically, emails confirming you've sent a document to your Kindle) and forwards the document download links to a specified AWS API Gateway URL. This can be useful for automating the handling of documents sent to your Kindle email address.

## Requirements

- A Google account with access to Google Apps Script.
- An AWS account with an API Gateway set up to receive POST requests.
- Pulumi for setting up the API Gateway (optional but recommended for infrastructure as code practices).

## Setup Instructions

### Step 1: Configure AWS API Gateway

Before deploying the script, you need to set up an API Gateway in AWS to receive the download URLs. You can use Pulumi to declare your infrastructure as code. Make sure to:
- Create a new Lambda function that will process the incoming data.
- Set up an API Gateway as a trigger for this Lambda.
- Deploy your infrastructure using Pulumi.

After deployment, note down your API Gateway's URL.

### Step 2: Insert API Gateway URL

Replace the placeholder URL in the `sendToApiGateway` function with your actual API Gateway URL:

javascript
var apiGatewayUrl = 'https://your_api_gateway_url.execute-api.us-east-1.amazonaws.com/prod';

### Step 3: Deploy the Google Apps Script

1. Go to [Google Apps Script](https://script.google.com/) and create a new project.
2. Copy and paste the provided code into the script editor.
3. Replace `xxxxxxxxxxx@gmail.com` in the `query` variable with your Kindle email address.
4. Save the script.

### Step 4: Set Up a Time-Driven Trigger

1. In the Google Apps Script editor, click on the clock icon (⏰) to open "Current project's triggers."
2. Click on "Add Trigger" in the lower right corner.
3. Choose the following settings for your trigger:
   - Choose which function to run: `checkKindleEmails`
   - Choose which deployment should run: `Head`
   - Select event source: `Time-driven`
   - Select type of time based trigger: `Minutes timer`
   - Select minute interval: `Every 5 minutes`
4. Save the trigger.

## How It Works

The script runs every 5 minutes, searching for unread emails from `do-not-reply@amazon.com` that contain "You sent" in the subject and are sent to your Kindle email address. It extracts the download URL from each email and sends it to your specified AWS API Gateway endpoint via a POST request. After processing, it marks the email as read to prevent reprocessing.

This automation streamlines the management of documents sent to your Kindle, especially if you're looking to integrate with other systems or databases.

## Note

Ensure your AWS API Gateway and Lambda function are correctly set up to handle and parse the incoming POST requests. The payload sent includes the subject, date, sender, and the Kindle document's download URL.
```
