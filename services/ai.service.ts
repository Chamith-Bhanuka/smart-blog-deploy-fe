// src/services/ai.service.ts
import api from './api';

export const generateAIContent = async (text: string, maxToken?: number) => {
  const res = await api.post('/post/ai/generate', { text, maxToken });
  return res.data;
};
