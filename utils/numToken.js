import { encode } from 'gpt-3-encoder';

export const numToken = (str) => {
    console.log('start tokenization sequence...');
    const tokens = encode(str);
    const numToken = tokens.length;
    return numToken;
};
