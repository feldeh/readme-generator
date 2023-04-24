import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

export const gptAPI = async (scrapedCode) => {
    const configuration = new Configuration({
        apiKey: process.env.API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const systemPrompt =
        'Act as a cyber security expert. You will generate a vulnerability assessment based on the source code provided by the user. Only list the three most important areas of concerns and suggest ways to fix them.';

    const userPrompt = `This is the source code:
  ${scrapedCode}
  `;

    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
        ],
    });

    return response.data.choices[0].message.content;
};
