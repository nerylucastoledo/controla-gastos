import '@testing-library/jest-dom';
import { TextEncoder } from 'util';

global.Request = jest.fn();
global.TextEncoder = TextEncoder;
