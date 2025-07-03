import { expect } from '@playwright/test';
import { employeeTest as test } from '../fixtures';
import { SelfAssessmentPage } from '../pages/SelfAssessmentPage';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function getRandomText() {
  // Generate a random paragraph with about 150 words
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

test('Employee can fill self assessment form and save as draft', async ({ authenticatedPage }) => {
  const selfAssessmentPage = new SelfAssessmentPage(authenticatedPage);
  await selfAssessmentPage.gotoFeedbackRequests();
  await selfAssessmentPage.openSelfAssessmentRow();
  await selfAssessmentPage.waitForForm();

  const skillRatingIds = [
    ':rk:-form-item', ':rl:-form-item', ':rm:-form-item', ':rn:-form-item', ':ro:-form-item', ':rp:-form-item', ':rq:-form-item', ':rr:-form-item', ':rs:-form-item', ':ru:-form-item', ':rv:-form-item', ':r10:-form-item', ':r12:-form-item', ':r13:-form-item', ':r14:-form-item', ':r16:-form-item', ':r17:-form-item', ':r19:-form-item', ':r1a:-form-item', ':r1b:-form-item', ':r1d:-form-item'
  ];
  await selfAssessmentPage.fillSkillRatings(skillRatingIds, getRandomInt);
  await selfAssessmentPage.fillCategoryFeedback(getRandomText);
  await selfAssessmentPage.fillGeneralFeedback(getRandomText);
  await selfAssessmentPage.fillOverallComment(getRandomText);
  await selfAssessmentPage.saveAsDraft();
});
