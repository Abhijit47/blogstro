import { type SubmitEvent, useState } from 'react';

import { Button } from '#components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '#components/ui/field';
import { Input } from '#components/ui/input';
import { Textarea } from '#components/ui/textarea';

export default function FeedbackForm() {
  const [responseMessage, setResponseMessage] = useState('');

  async function submit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch('/api/feedback', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    if (data.message) {
      setResponseMessage(data.message);
    }
  }

  return (
    <form onSubmit={submit}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend> Reach out to me </FieldLegend>
          <FieldDescription>
            {responseMessage ? (
              <p>{responseMessage}</p>
            ) : (
              <p>I will get back to you as soon as possible.</p>
            )}
          </FieldDescription>
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
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />

        <FieldSet>
          <FieldGroup>
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
        </FieldSet>
        <Field orientation='horizontal'>
          <Button type='submit'>Submit</Button>
          <Button variant='outline' type='button'>
            {' '}
            Cancel{' '}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
