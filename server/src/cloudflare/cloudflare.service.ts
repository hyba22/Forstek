import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CloudflareService {
  private workerUrl = 'https://ai-assistance.forstek.workers.dev';

  async runAI(prompt: string) {
    try {
      const response = await axios.post(this.workerUrl, {
        prompt: prompt, 
      }, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Cloudflare response:', response.data);
      return response.data.response; 
    } catch (error) {
      console.error('Cloudflare error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw new Error(`Failed to run AI: ${error.message}${error.response?.data ? ` - ${JSON.stringify(error.response.data)}` : ''}`);
    }
  }
}