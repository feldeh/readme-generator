import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

export const gptAPI = async (scrapedCode) => {
    const configuration = new Configuration({
        apiKey: process.env.API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    // const sourceCode =
    //     "\timport { createContext, useEffect, useState } from 'react';\n\timport axios from 'axios';\n\timport { data } from 'autoprefixer';\n\t\n\n\texport const UserContext = createContext({});\n\t\n\n\texport function UserContextProvider({ children }) {\n\t  const [user, setUser] = useState(null);\n\t  const [ready, setReady] = useState(false);\n\t  useEffect(() => {\n\t    if (!user) {\n\t      axios.get('/profile').then(({ data }) => {\n\t        setUser(data);\n\t        setReady(true);\n\t      });\n\t    }\n\t  }, []);\n\t  return <UserContext.Provider value={{ user, setUser, ready }}>{children}</UserContext.Provider>;\n\t}";

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
