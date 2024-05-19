var fs = require("fs");
var path = require("path");

// Define the source and destination paths
var srcPath = path.join(
  __dirname,
  "../src/assets/xml/network_security_config.xml"
);
var destPath = path.join(
  __dirname,
  "../platforms/android/app/src/main/res/xml/network_security_config.xml"
);

// Create the destination directory if it doesn't exist
var destDir = path.dirname(destPath);
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy the file
fs.copyFileSync(srcPath, destPath);
console.log("Copied network_security_config.xml to Android platform directory");
