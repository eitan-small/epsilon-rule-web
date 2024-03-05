import { v4 as uuid } from 'uuid';

const generateUUID = () => uuid().replace(/-/g, '');

// eslint-disable-next-line import/prefer-default-export
export { generateUUID };
