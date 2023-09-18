const http = require('http');
const fs = require('fs');

// Get command line arguments: URL to fetch and the file path to save the data
const url = process.argv[2];
const filePath = process.argv[3];

// Make an HTTP GET request to the specified URL
http.get(url, (conn) => {
  let data = ''; // Initialize an empty string to store the received data

  // A chunk of data has been received.
  conn.on('data', (chunk) => {
    data += chunk; // Append each chunk of data to the 'data' variable
  });

  // The whole response has been received.
  conn.on('end', () => {
    // Write the collected data to the specified file
    fs.writeFile(filePath, data, (err) => {
      if (err) throw err; // Handle any errors during file writing
      console.log(`Downloaded and saved ${data.length} bytes to ${filePath}`);
    });
  });

}).on("error", (err) => {
  // Handle errors that occur during the HTTP request
  console.log("Error: " + err.message);
});
// Expected output:
// $ node fetcher.js http://www.example.edu/ ./index.html
// Downloaded and saved 3261 bytes to ./index.html