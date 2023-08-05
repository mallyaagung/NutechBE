const { google } = require("googleapis");
const fs = require("fs");

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URL
);

oAuth2Client.setCredentials({ refresh_token: process.env.DRIVE_REFRESH_TOKEN });

const uploadGoogleDrive = async (file) => {
  try {
    const drive = google.drive({
      version: "v3",
      auth: oAuth2Client,
    });

    const response = await drive.files.create({
      requestBody: {
        name: file.filename,
        mimeType: file.mimeType,
        parents: ["11vQiHxlAjsprvShTaofKXkGB74KqXdku"],
      },
      media: {
        mimeType: file.mimeType,
        body: fs.createReadStream(file.path),
      },
    });

    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const result = await drive.files.get({
      fileId: response.data.id,
    });

    return response.data.id; //response.data.id
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = uploadGoogleDrive;
