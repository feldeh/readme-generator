import { readFile } from 'fs/promises';

export const readFromTextFile = async () => {
    try {
        const code = await readFile('./repoSourceCode.txt', {
            encoding: 'utf8',
        });
        return code;
    } catch (error) {
        console.log(error);
    }
};
