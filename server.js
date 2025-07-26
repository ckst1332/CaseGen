import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import 'dotenv/config';

const app = express();
app.use(express.json());
app.use(cors());

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

app.post('/api/integrations/invoke-llm', async (req, res) => {
  try {
    const { prompt, response_json_schema } = req.body || {};
    if (!prompt) {
      return res.status(400).json({ error: 'Missing prompt' });
    }

    const body = {
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
    };

    // If a schema is provided, pass it as a tool specification
    if (response_json_schema) {
      body.tools = [
        {
          type: 'function',
          function: {
            name: 'auto',
            parameters: response_json_schema,
          },
        },
      ];
    }

    const response = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(500).json({ error: text || response.statusText });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to call OpenAI API' });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
