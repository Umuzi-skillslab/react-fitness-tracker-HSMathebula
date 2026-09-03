import { TextDecoder, TextEncoder } from 'util';
import '@testing-library/jest-dom';

// React Router needs these Web APIs, which jsdom does not provide.
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
