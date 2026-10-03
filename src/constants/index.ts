import type { Person, WithContext } from 'schema-dts';

export const siteMetadata = {
  name: 'Abhijit K.',
  email: 'akarmakar846@gmail.com',
  phone: '+91 956 382 8213',
  title: 'Abhijit Karmakar | Software Engineer',
  description:
    'I am a software engineer with a passion for building scalable and efficient web applications. I specialize in front-end development, particularly with React and Astro, and have experience in back-end technologies as well. I enjoy learning new technologies and contributing to open-source projects.',
  keywords: [
    'Abhijit Karmakar',
    'Software Engineer',
    'Web Development',
    'React',
    'Astro',
    'Open Source',
    'West Bengal',
    'India',
  ],
  socials: {
    github: 'https://github.com/Abhijit47',
    linkedin: 'https://www.linkedin.com/in/abhijit-karmakar/',
    twitter: 'https://twitter.com/AbhijitKarmakar',
    instagram: 'https://www.instagram.com/abhijitkarmakar/',
  },
};

export const JSONLDInfo: WithContext<Person> = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Abhijit K.',
  url: 'https://abhijitk.dev',
  sameAs: [
    'https://www.linkedin.com/in/abhijit-karmakar/',
    'https://github.com/Abhijit47',
  ],
  alternateName: 'Abhijit Karmakar',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: ['MAKAUT University', 'KITM College'],
  },
  knowsAbout: ['Compilers', 'Computer Science'],
};
