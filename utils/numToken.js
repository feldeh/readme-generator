import { encode } from 'gpt-3-encoder';

export const numToken = (str) => {
    const tokens = encode(str);
    const numToken = tokens.length;
    return numToken;
};
