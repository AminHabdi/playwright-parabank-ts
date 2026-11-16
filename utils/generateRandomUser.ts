import registerDataJson from '../resources/testData.json';

export function randomUser() {
    // Holt den aktuellen Playwright Worker-Index (0, 1, 2...) für echte Parallel-Sicherheit
    const workerIndex = process.env.TEST_WORKER_INDEX || '0';
    const uniqueUsername = `user_w${workerIndex}_${Date.now()}_${Math.floor(Math.random() * 1000000)}`; 
    
    return {
        ...registerDataJson.signingupValidData,
        username: uniqueUsername
    };
}