import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import readline from "readline";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInterface.prompt();
userInterface.on("line", async (input) => {
  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: input }],
  });
  console.log(res.data.choices[0].message.content);
  userInterface.prompt();

  // .then((res) => {
  //   console.log(res.data.choices[0].message.content);
  // });
});
