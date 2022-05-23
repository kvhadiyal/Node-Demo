const AWS = require('aws-sdk');
const awsUtils = {};
const fs = require('fs');
const { RekognitionClient, StartLabelDetectionCommand, GetLabelDetectionCommand } = require("@aws-sdk/client-rekognition");

const S3 = new AWS.S3({
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY
});

const rekClient = new RekognitionClient({ region: "us-west-2" });

const startLabelDetection = async () => {
    try {
        //Initiate label detection and update value of startJobId with returned Job ID
        const labelDetectionResponse = await rekClient.send(new StartLabelDetectionCommand({ Video: { S3Object: { Bucket: "custom-labels-console-us-west-2-c527eab9e0", Name: "SampleVideo_1280x720_1mb.mp4" } } }));
        let startJobId = labelDetectionResponse.JobId;
        console.log(`JobID: ${startJobId}`);
        return startJobId;
    } catch (err) {
        console.log("Error", err);
    }
};

const getLabelDetectionResults = async (startJobId) => {
    console.log("Retrieving Label Detection results");
    // Set max results, paginationToken and finished will be updated depending on response values
    var maxResults = 10;
    var paginationToken = '';
    var finished = false;

    // Begin retrieving label detection results
    while (finished == false) {
        var response = await rekClient.send(new GetLabelDetectionCommand({
            JobId: startJobId, MaxResults: maxResults,
            NextToken: paginationToken, SortBy: 'TIMESTAMP'
        }));
        // For every detected label, log label, confidence, bounding box, and timestamp
        response.Labels.forEach(labelDetection => {
            var label = labelDetection.Label;
            console.log(`Timestamp: ${labelDetection.Timestamp}`);
            console.log(`Label: ${label.Name}`);
            console.log(`Confidence: ${label.Confidence}`);
            console.log("Instances:");
            label.Instances.forEach(instance => {
                console.log(`Confidence: ${instance.Confidence}`);
                console.log("Bounding Box:");
                console.log(`Top: ${instance.Confidence}`);
                console.log(`Left: ${instance.Confidence}`);
                console.log(`Width: ${instance.Confidence}`);
                console.log(`Height: ${instance.Confidence}`);
                console.log();
            });
            console.log();
            // Log parent if found
            console.log("   Parents:");
            label.Parents.forEach(parent => {
                console.log(`    ${parent.Name}`);
            });
            // Searh for pagination token, if found, set variable to next token
            if (String(response).includes("NextToken")) {
                paginationToken = response.NextToken;

            } else {
                finished = true;
            }

        });
    }
};

// Start label detection job, check for success status
const runLabelDetectionAndGetResults = async () => {
    try {
        const startLabelDetectionRes = await startLabelDetection();
        console.log("Retrieving results:");
        await getLabelDetectionResults(startLabelDetectionRes);
        console.log("Successfully deleted.");
    } catch (err) {
        console.log("Error", err);
    }
};

awsUtils.getSignedUrl = (key, expiresIn) => {
    const url = S3.getSignedUrl('getObject', {
        Bucket: config.AWS_CONFIG_S3.bucket,
        Key: key,
        Expires: (expiresIn) ? expiresIn : config.SIGNEDURLEXPIRES,
    });
    return {
        url, key
    };
};



awsUtils.uploadFile = (file, key) => {
    let fileData = fs.readFileSync(file.path);
    return new Promise((resolve, reject) => {
        const params = {
            Body: fileData,
            Bucket: config.AWS_S3_BUCKET,
            Key: key,
            ContentType: file.mime,
        };
        S3.upload(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                const url = S3.getSignedUrl('getObject', {
                    Bucket: config.AWS_S3_BUCKET,
                    Key: data.Key,
                    Expires: config.SIGNEDURLEXPIRES
                });
                resolve({
                    url, key: data.Key
                });
            }
        });
    });
};



module.exports = awsUtils;
