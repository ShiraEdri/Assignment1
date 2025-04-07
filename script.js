const fs = require('fs');

// generates count data
function generateNotesData(count) {
  const notes = [];
  for (let i = 1; i <= count; i++) {
    notes.push({
      id: i,
      title: `Note ${i}`,
      author: {
        name: `Author ${i}`,
        email: `mail_${i}@gmail.com`
      },
      content: `Content for note ${i}`
    });
  }
  return { notes };
}

// get count from cmdline
const args = process.argv.slice(2);
const count = parseInt(args[0]); 
const filePath = './data/notes2.json'; 
// generate data
const data = generateNotesData(count);
// save data
fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
