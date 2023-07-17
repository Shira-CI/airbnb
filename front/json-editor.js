const fs = require('fs');

function addReviewRatings(jsonFilePath) {
  // Read the JSON file
  const data = fs.readFileSync(jsonFilePath, 'utf8');
  const jsonData = JSON.parse(data);

  // Iterate over each object in the array
  for (const obj of jsonData) {
    // Check if the object has a "reviews" key
    if (obj.reviews && Array.isArray(obj.reviews)) {
      // Iterate over each review object
      for (const review of obj.reviews) {
        // Generate random ratings between 4 and 5 for each category
        const cleanliness = getRandomRating(4, 5);
        const communication = getRandomRating(4, 5);
        const checkIn = getRandomRating(4, 5);
        const accuracy = getRandomRating(4, 5);
        const location = getRandomRating(4, 5);
        const value = getRandomRating(4, 5);

        // Add the "rate" key-value pair to the review object
        review.rate = {
          cleanliness: parseFloat(cleanliness),
          communication: parseFloat(communication),
          checkIn: parseFloat(checkIn),
          accuracy: parseFloat(accuracy),
          location: parseFloat(location),
          value: parseFloat(value)
        };
      }
    }
  }

  // Write the modified JSON data back to the file
  const updatedData = JSON.stringify(jsonData, null, 2);
  fs.writeFileSync(jsonFilePath, updatedData, 'utf8');

  console.log(`Review ratings added to ${jsonFilePath}`);
}

function getRandomRating(min, max) {
  return (Math.random() * (max - min) + min).toFixed(1);
}

// Usage
const jsonFilePath = './src/data/stay.json';
addReviewRatings(jsonFilePath);
