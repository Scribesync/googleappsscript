function checkKindleEmails() {
    var query = 'from:do-not-reply@amazon.com subject:"You sent" to:xxxxxxxxxxx@gmail.com';

    var threads = GmailApp.search(query);

    // Process each email
    threads.forEach(function(thread) {
        var messages = thread.getMessages();
        messages.forEach(function(message) {
            if (!message.isRead()) {
                var body = message.getBody();
                var url = extractDownloadUrl(body);

                if (url) {
                    // Prepare email details with the extracted URL
                    var emailDetails = {
                        subject: message.getSubject(),
                        date: message.getDate(),
                        sender: message.getFrom(),
                        downloadUrl: url
                    };

                    // Send the details to the AWS API Gateway
                    sendToApiGateway(emailDetails);

                    // Mark the email as read
                    message.markRead();
                }
            }
        });
    });
}

function extractDownloadUrl(body) {
    var urlRegex = /href="(https:\/\/www.amazon.com\/gp\/digital\/fiona\/manage\/download\/[^\s"]+)"/;
    var match = body.match(urlRegex);
    return match ? match[1] : null;
}

function sendToApiGateway(emailDetails) {
    var apiGatewayUrl = 'https:/xxxxxxxxx.execute-api.us-east-1.amazonaws.com/prod';

    var options = {
        'method' : 'post',
        'contentType': 'application/json',
        'payload' : JSON.stringify(emailDetails)
    };

    // Make a POST request with the email details
    UrlFetchApp.fetch(apiGatewayUrl, options);
}
