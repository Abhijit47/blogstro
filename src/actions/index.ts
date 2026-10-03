import { z } from 'astro/zod';
import { defineAction } from 'astro:actions';
import { feedbackActions } from './feedback';

export const server = {
  // action declarations
  getGreeting: defineAction({
    input: z.object({
      name: z.string(),
    }),
    handler: async (input) => {
      return `Hello, ${input.name}!`;
    },
  }),
  feedbackActions,
};
