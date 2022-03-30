import { createWorker } from 'tesseract.js';
const parser = require("mrz-parser-js");


const worker = createWorker({
    logger: m => console.log(m),
  });

export const dataFromImage = async (imageUrl) => {
    /**
     * Extract data from image using tesseractjs
     */
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(imageUrl);
    /**
     * Seperate MRZ code from extracted data
     */
    const lines = text.split('\n');
    /**
     * Parse the MRZ code to get the properly 
     * formatted data using mrz-parser-js
     */
    let parsed = parser.parse(lines[lines.length - 3],lines[lines.length - 2])
    // console.log(parsed);
    /**
     * Slice Date of which is returned in this form '000000'
     * the first two digits being the year, 
     * the second two digits being the month 
     * and last two digits being the day
     */
    const dob = parsed.date_of_birth;
    const newDob = new Date(dob.slice(0, 2), dob.slice(2, 4), dob.slice(4, 6));
    const monthValid = new Date('0000', dob.slice(2, 4)).getFullYear();
    const dayValid = new Date('0000', dob.slice(4, 6)).getFullYear();
    console.log()
    return {
      name: parsed.names, 
      dateOfBirth: `${(newDob.getFullYear()) ? newDob.getFullYear() : '0000'}-${(monthValid) ? dob.slice(2, 4) : '01'}-${(dayValid) ? dob.slice(4, 6) : '01'}`, 
      passportNo: parsed.number, 
      nationality: parsed.country
    };
};

