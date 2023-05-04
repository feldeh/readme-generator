import { readFile, stat } from 'fs/promises';

export const readFromTextFile = async () => {
    const filepath = './repoSourceCode.txt';
    try {
        await stat(filepath);
        const code = await readFile(filepath, {
            encoding: 'utf8',
        });
        return code;
    } catch (error) {
        if (error.code === 'ENOENT') {
            return error.code;
        } else {
            throw error;
        }
    }
};
