// utils/testUtils.ts
// Common utility functions for test automation

/**
 * Returns a random integer from 0 (inclusive) up to max (exclusive)
 */
export function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

/**
 * Returns a random integer between min and max (both inclusive)
 */
export function getRandomIntBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random paragraph with about 150 words
 */
export function getRandomText(): string {
  const words: string[] = [];
  const wordBank: string[] = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor',
    'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'ut', 'enim', 'ad', 'minim', 'veniam', 'quis',
    'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea', 'commodo', 'consequat',
    'duis', 'aute', 'irure', 'dolor', 'in', 'reprehenderit', 'in', 'voluptate', 'velit', 'esse', 'cillum', 'dolore',
    'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt',
    'in', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'praesent', 'sapien',
    'dictum', 'varius', 'duis', 'at', 'volutpat', 'mauris', 'sit', 'amet', 'aliquam', 'sem', 'etiam', 'erat',
    'velit', 'scelerisque', 'in', 'dictum', 'non', 'consectetur', 'a', 'erat', 'nam', 'at', 'lectus', 'urna',
    'duis', 'convallis', 'convallis', 'tellus', 'id', 'interdum', 'velit', 'laoreet', 'id', 'donec', 'ultrices',
    'tincidunt', 'arcu', 'non', 'sodales', 'neque', 'sodales', 'ut', 'etiam', 'sit', 'amet', 'nisl', 'purus',
    'in', 'mollis', 'nunc', 'sed', 'id', 'semper', 'risus', 'in', 'hendrerit', 'gravida', 'rutrum', 'quisque',
    'non', 'tellus', 'orci', 'ac', 'auctor', 'augue', 'mauris', 'augue', 'neque', 'gravida', 'in', 'fermentum',
    'posuere', 'urna', 'nec', 'tincidunt', 'praesent', 'semper', 'feugiat', 'nibh', 'sed', 'pulvinar', 'proin',
    'gravida', 'hendrerit', 'lectus', 'a', 'molestie', 'urna', 'dictum', 'sit', 'amet', 'justo', 'donec', 'enim',
    'diam', 'vulputate', 'ut', 'pharetra', 'sit', 'amet', 'aliquam', 'id', 'diam', 'maecenas', 'ultricies', 'mi',
    'eget', 'mauris', 'pharetra', 'et', 'ultrices', 'neque', 'ornare', 'aenean', 'euismod', 'elementum', 'nisi',
    'quis', 'eleifend', 'quam', 'adipiscing', 'vitae', 'proin', 'sagittis', 'nisl', 'rhoncus', 'mattis', 'rhoncus',
    'urna', 'neque', 'vivamus', 'arcu', 'felis', 'bibendum', 'ut', 'tristique', 'et', 'egestas', 'quis', 'ipsum',
    'suspendisse', 'ultrices', 'gravida', 'dictum', 'fusce', 'ut', 'placerat', 'orci', 'nulla', 'pellentesque', 'dignissim',
    'enim', 'sit', 'amet', 'venenatis', 'urna', 'cursus', 'eget', 'nunc', 'scelerisque', 'viverra', 'mauris', 'in',
    'aliquet', 'ut', 'porttitor', 'leo', 'a', 'diam', 'sollicitudin', 'tempor', 'id', 'eu', 'nisl', 'rhoncus', 'mattis'
  ];
  for (let i = 0; i < 150; i++) {
    words.push(wordBank[getRandomInt(wordBank.length)]);
  }
  let paragraph = words.join(' ');
  paragraph = paragraph.charAt(0).toUpperCase() + paragraph.slice(1) + '.';
  return paragraph;
}
