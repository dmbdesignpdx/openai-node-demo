/**
 * @file Provides the main program.
 */


// Theirs
import OpenAI from 'openai';
import { stdin as input, stdout as output } from "node:process";
import readline from "node:readline/promises";

// Ours
import * as c from "./constants/index.js";


//
// SECTION -- Instantiations
//

const openai = new OpenAI(c.API_KEY);
const ui = readline.createInterface({ input, output });

async function generateContent(prompt) {
  const completion = await openai.chat.completions.create({
    model: c.MODEL,
    max_completion_tokens: c.MAX_TOKENS,
    messages: [
      { role: "system", content: c.SYSTEM_INSTRUCTIONS },
      { role: "user", content: prompt },
    ],
  });

  return completion.choices[0];
}

output.write(c.INTRO_PROMPT);

const prompt = await ui.question(c.GREET_PROMPT);

// Bail!
if (prompt === "exit") process.exit();

const result = await generateContent(prompt);

output.write("Hang tight... \n");
output.write(`${result.message.content}\n`);
ui.close();
