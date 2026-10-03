import { siteMetadata } from '#/constants';
import { Menu, XCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { Button, buttonVariants } from './ui/button';
import { Separator } from './ui/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

const links = [
  {
    id: crypto.randomUUID(),
    name: 'Home',
    href: '/',
  },
  {
    id: crypto.randomUUID(),
    name: 'About',
    href: '/about',
  },
  {
    id: crypto.randomUUID(),
    name: 'Blogs',
    href: '/blogs',
  },
  {
    id: crypto.randomUUID(),
    name: 'Contact',
    href: '/contact',
  },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button size={'icon-sm'} className={'block md:hidden'}>
          {isOpen ? (
            <XCircleIcon className='size-4 mx-auto' />
          ) : (
            <Menu className='size-4 mx-auto' />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <h2>{siteMetadata.name}</h2>
          </SheetTitle>
          <SheetDescription>{siteMetadata.description}</SheetDescription>
        </SheetHeader>

        <Separator />
        <div>
          <ul>
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'link',
                  })}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button variant='outline'>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
