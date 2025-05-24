import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

// export const uploadMedia = async (files, dir) => {
//   files = files.length ? files : [files];
//   const images = [];
//   files.forEach(async (file) => {
//     const result = await cloudinary.uploader.upload(file.tempFilePath, {
//       folder: dir,
//       transformation: {
//         format: "auto",
//         width: 500,
//         height: 500,
//         crop: "scale",
//       },
//     });
//     const image = {
//       public_id: result.public_id,
//       url: result.secure_url,
//     };
//     images.push(image);
//   });

//   return images;
// };

export default cloudinary;
