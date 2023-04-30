import { readFile } from 'fs/promises';

export async function readFromTextFile() {
    try {
        const code = await readFile('./repoSourceCode.txt', {
            encoding: 'utf8',
        });
        return code;
    } catch (error) {
        console.log(error);
    }
}
