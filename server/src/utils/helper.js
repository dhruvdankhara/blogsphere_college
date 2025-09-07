import fs from "fs";

export const removeMulterImageFilesOnError = (req) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.log("Error while removing file from local:", err);
      } else {
        console.log("Removed file local path: ", req.file.path);
      }
    });
  }
};
