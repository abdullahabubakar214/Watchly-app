import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

//->file uploaded on localserver and give url to cloudinary
//  Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async function () {
  try {
    if (!localFilePath) return null;
    //upload file on cloudinary
    const uploadFile = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("File Uploaded Successfully on Cloudinary", uploadFile.url);
    return uploadFile;
  } catch (error) {
    // remove the locally saved temporary file as the upload operation got failed
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };
