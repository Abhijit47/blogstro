import { z } from 'astro/zod';
import { ActionError, defineAction } from 'astro:actions';
// import { email } from 'astro:schema';

const feedbacks = [
  {
    id: '1',
    name: 'John Doe',
    message: 'Great job!',
  },
  {
    id: '2',
    name: 'Jane Smith',
    message: 'Keep up the good work!',
  },
  {
    id: '3',
    name: 'Alice Johnson',
    message: 'I love this project!',
  },
  {
    id: '4',
    name: 'Bob Brown',
    message: 'This is very helpful!',
  },
];

export const feedbackActions = {
  getFeedback: defineAction({
    input: z.object({
      id: z.string(),
    }),
    handler: async (input) => {
      // Simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const feedback = feedbacks.find((f) => f.id === input.id);
      if (!feedback) {
        throw new ActionError({
          code: 'NOT_FOUND',
          message: `Feedback with id ${input.id} not found.`,
        });
      }
      return feedback;
    },
  }),

  createFeedback: defineAction({
    input: z.object({
      name: z.string(),
      email: z.email(),
      message: z.string(),
    }),
    handler: async (input) => {
      // Simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newFeedback = {
        id: (feedbacks.length + 1).toString(),
        name: input.name,
        message: input.message,
      };
      feedbacks.push(newFeedback);
      return newFeedback;
    },
  }),

  deleteFeedback: defineAction({
    input: z.object({ id: z.string() }),
    handler: async (input, ctx) => {
      // Simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const index = feedbacks.findIndex((f) => f.id === input.id);
      if (index === -1) {
        throw new ActionError({
          code: 'NOT_FOUND',
          message: `Feedback with id ${input.id} not found.`,
        });
      }
      const deletedFeedback = feedbacks.splice(index, 1)[0];
      return deletedFeedback;
    },
  }),
};
