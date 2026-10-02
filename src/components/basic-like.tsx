import { useState } from 'react';
import { Button } from './ui/button';

export default function BasicLike() {
  const [like, setLike] = useState(0);

  return <Button onClick={() => setLike(like + 1)}>Like {like}</Button>;
}
