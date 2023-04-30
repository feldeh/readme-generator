import { Configuration, OpenAIApi } from 'openai';

export const gptAPI = async (sourceCode, key) => {
    const configuration = new Configuration({
        apiKey: key,
    });

    const openai = new OpenAIApi(configuration);

    const systemPrompt =
        'Act as a cyber security expert. Generate a vulnerability assessment based on the source code provided delimited by three double quotes. Only list three vulnerabilities and limit your response to 200 tokens.';

    const userPrompt = `
  """${sourceCode}"""
  `;

    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
        ],
        max_tokens: 200,
    });

    return response.data.choices[0].message.content;
};
