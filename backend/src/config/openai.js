const OpenAI = require('openai');

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY ist nicht gesetzt!');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = openai;
