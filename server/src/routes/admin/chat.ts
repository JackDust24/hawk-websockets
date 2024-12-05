import { Router, Request, Response } from 'express';
import axios from 'axios';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const router = Router();

router.post('/chat', async (req, res) => {
  const { userMessage } = req.body;

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

  if (!userMessage) {
    return res.status(400).send({ error: 'Message is required' });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a customer support assistant.' },
          { role: 'user', content: userMessage },
        ],
        max_tokens: 500,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.send({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ error: 'An error occurred.' });
  }
});

export default router;
