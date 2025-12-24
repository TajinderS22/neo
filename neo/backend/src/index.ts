import dotenv from 'dotenv'
import Anthropic from '@anthropic-ai/sdk';


dotenv.config()

// const client = new Anthropic({
//   apiKey: process.env['ANTHROPIC_API_KEY'], 
// });

// const message = await client.messages.create({
//   max_tokens: 1024,
//   messages: [{ role: 'user', content: 'Hello, Claude' }],
//   model: 'claude-sonnet-4-5-20250929',
// });

// console.log(message.content);




console.log(process.env.ANTHROPIC_API_KEY)