import { TextDecoder, TextEncoder } from 'util';
import { configure } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// React Router needs these Web APIs, which jsdom does not provide.
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Coverage instrumentation makes App/library renders slower than the 5s default.
jest.setTimeout(30000);
configure({ asyncUtilTimeout: 8000 });

const setupUser = userEvent.setup.bind(userEvent);
userEvent.setup = (options) => setupUser({ delay: null, ...options });

beforeEach(() => {
  localStorage.clear();
});
