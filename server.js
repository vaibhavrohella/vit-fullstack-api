const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

function isNumber(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}

function isAlphabetic(char) {
    return /^[a-zA-Z]$/.test(char);
}

function isSpecialCharacter(char) {
    return /^[^a-zA-Z0-9]$/.test(char);
}

function createAlternatingCaps(alphabets) {
    let allChars = [];
    
    alphabets.forEach(item => {
        for (let char of item) {
            if (isAlphabetic(char)) {
                allChars.push(char.toLowerCase());
            }
        }
    });
    
    allChars.reverse();
    
    let result = '';
    for (let i = 0; i < allChars.length; i++) {
        if (i % 2 === 0) {
            result += allChars[i].toLowerCase();
        } else {
            result += allChars[i].toUpperCase();
        }
    }
    
    return result;
}

app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input: 'data' must be an array"
            });
        }
        
        const oddNumbers = [];
        const evenNumbers = [];
        const alphabets = [];
        const specialCharacters = [];
        let sum = 0;
        
        data.forEach(item => {
            const itemStr = String(item);
            
            if (isNumber(itemStr)) {
                const num = parseInt(itemStr);
                if (num % 2 === 0) {
                    evenNumbers.push(itemStr);
                } else {
                    oddNumbers.push(itemStr);
                }
                sum += num;
            } else {
                let hasAlphabetic = false;
                let processedItem = '';
                
                for (let char of itemStr) {
                    if (isAlphabetic(char)) {
                        hasAlphabetic = true;
                        processedItem += char.toUpperCase();
                    } else if (isSpecialCharacter(char)) {
                        specialCharacters.push(char);
                    }
                }
                
                if (hasAlphabetic && processedItem) {
                    alphabets.push(processedItem);
                }
            }
        });
        
        const concatString = createAlternatingCaps(alphabets);
        
        const response = {
            is_success: true,
            user_id: "vaibhav_rohella_07112003", 
            email: "vaibhav.rohella2022@vitstudent.ac.in", 
            roll_number: "22BCE1543", 
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets: alphabets,
            special_characters: specialCharacters,
            sum: String(sum),
            concat_string: concatString
        };
        
        res.status(200).json(response);
        
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            is_success: false,
            error: "Internal server error"
        });
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        is_success: false,
        error: "Something went wrong!"
    });
});

app.use((req, res) => {
    res.status(404).json({
        is_success: false,
        error: "Route not found"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API endpoint: http://localhost:${PORT}/bfhl`);
});

module.exports = app;