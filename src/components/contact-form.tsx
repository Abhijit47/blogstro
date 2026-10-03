import { actions } from 'astro:actions';
import { navigate } from 'astro:transitions/client';
import { type SubmitEvent, useRef, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '#components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '#components/ui/field';
import { Input } from '#components/ui/input';
import { Textarea } from '#components/ui/textarea';

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [responseMessage, setResponseMessage] = useState('');

  function submit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    // const { data, error } = await actions.getGreeting({ name: 'Houston' });

    toast.promise(actions.getGreeting({ name: 'Houston' }), {
      loading: 'Loading...',
      success: (data) => {
        setResponseMessage(`Success! ${data.data}`);
        formRef.current?.reset();
        return `Success! ${data.data}`;
      },
      error: (err) => {
        setResponseMessage(`Error! ${err.message}`);
        formRef.current?.reset();
        return `Error! ${err.message}`;
      },
    });
  }

  function deleteFeedback() {
    toast.promise(actions.feedbackActions.deleteFeedback.orThrow({ id: '5' }), {
      loading: 'Deleting feedback...',
      success: (data) => {
        setResponseMessage(`Deleted feedback: ${data.id}`);
        formRef.current?.reset();
        return `Deleted feedback: ${data.id}`;
      },
      error: (err) => `Error! ${err.message}`,
      finally: () => {
        return navigate('/', { history: 'replace' });
      },
    });
  }

  return (
    <form onSubmit={submit} ref={formRef}>
      <FieldGroup>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor='fullName'> Name </FieldLabel>
            <Input
              id='fullName'
              name='name'
              placeholder='Evil Rabbit'
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor='email'> Email </FieldLabel>
            <Input
              id='email'
              name='email'
              placeholder='someone@gmail.com'
              required
            />
            <FieldDescription>
              I will get back to you as soon as possible.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor='message'>Comments</FieldLabel>
            <Textarea
              id='message'
              placeholder='Add any additional comments'
              name='message'
              className='resize-none'
            />
          </Field>
        </FieldGroup>

        <FieldDescription>
          {responseMessage && responseMessage}
        </FieldDescription>

        <FieldSeparator />

        <Field orientation='horizontal'>
          <Button type='submit'>Submit</Button>
          <Button variant='outline' type='button'>
            Cancel
          </Button>
          <Button
            type='button'
            variant={'destructive'}
            onClick={deleteFeedback}>
            Delete
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
