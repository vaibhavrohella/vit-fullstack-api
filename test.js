const http = require('http');

const testCases = [
    {
        name: "Example A",
        data: ["a", "1", "334", "4", "R", "$"]
    },
    {
        name: "Example B", 
        data: ["2", "a", "y", "4", "&", "-", "*", "5", "92", "b"]
    },
    {
        name: "Example C",
        data: ["A", "ABcD", "DOE"]
    }
];

function makeRequest(testData, callback) {
    const postData = JSON.stringify({ data: testData.data });
    
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/bfhl',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };
    
    const req = http.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            try {
                const response = JSON.parse(data);
                console.log(`\n=== ${testData.name} ===`);
                console.log('Request:', testData.data);
                console.log('Response:', JSON.stringify(response, null, 2));
                callback();
            } catch (error) {
                console.error('Error parsing response:', error);
                callback();
            }
        });
    });
    
    req.on('error', (error) => {
        console.error('Request error:', error);
        callback();
    });
    
    req.write(postData);
    req.end();
}

function runTests() {
    let currentTest = 0;
    
    function runNextTest() {
        if (currentTest < testCases.length) {
            makeRequest(testCases[currentTest], () => {
                currentTest++;
                setTimeout(runNextTest, 100);
            });
        } else {
            console.log('\n=== All tests completed ===');
        }
    }
    
    console.log('Starting API tests...');
    console.log('Make sure your server is running on http://localhost:3000');
    runNextTest();
}

setTimeout(runTests, 1000);