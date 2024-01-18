const { spawn } = require('child_process');

async function newSentence(sentence) {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', ['./flair_script.py', sentence]);

        let result = '';

        pythonProcess.stdout.on('data', (data) => {
            result += data.toString();
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                // Find the JSON part in the result
                const jsonStart = result.indexOf('[');
                const jsonEnd = result.lastIndexOf(']');
                const jsonResult = result.substring(jsonStart, jsonEnd + 1);

                try {
                    const parsedResult = JSON.parse(jsonResult);
                    resolve(parsedResult);
                } catch (error) {
                    reject(error);
                }
            } else {
                reject(`Python script exited with code ${code}`);
            }
        });

    });
}

module.exports = newSentence;
