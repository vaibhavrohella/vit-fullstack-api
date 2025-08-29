# VIT Full Stack API

REST API built according to VIT Full Stack question requirements.

## Features

- **POST /bfhl**: Main endpoint that processes an array and returns categorized data
- **GET /bfhl**: Health check endpoint that returns operation code
- Handles even/odd numbers, alphabets, special characters
- Calculates sum of numbers
- Creates concatenated string with alternating caps in reverse order

## Local Setup

### Prerequisites
- Node.js
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vaibhavrohella/vit-fullstack-api.git
   cd vit-fullstack-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Update your details**
   Edit `server.js` and replace the placeholder values to your name:
   ```javascript
   user_id: "vaibhav_rohella_07112003",
   email: "vaibhav.rohella2022@vitstudent.ac.in",
   roll_number: "22BCE1543"
   ```

4. **Run the server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Test the API**
   ```bash
   npm test
   ```

## API Endpoints

### POST /bfhl
Processes input data and returns categorized results.

**Request Body:**
```json
{
    "data": ["a", "1", "334", "4", "R", "$"]
}
```

**Response:**
```json
{
    "is_success": true,
    "user_id": "vaibhav_rohella_07112003",
    "email": "vaibhav.rohella2022@vistsudent.ac.in",
    "roll_number": "22BCE1543",
    "odd_numbers": ["1"],
    "even_numbers": ["334", "4"],
    "alphabets": ["A", "R"],
    "special_characters": ["$"],
    "sum": "339",
    "concat_string": "Ra"
}
```

### GET /bfhl
Health check endpoint.

**Response:**
```json
{
    "operation_code": 1
}
```

## Deployment Options

### 1. Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Create vercel.json**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "/server.js"
       }
     ]
   }
   ```

## Testing

Use the provided test file or test manually with curl:

```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data": ["a","1","334","4","R", "$"]}'
```

## Logic Explanation

1. **Input Validation**: Checks if data is a valid array
2. **Data Processing**: 
   - Numbers are checked for even/odd and added to sum
   - Alphabetic characters are converted to uppercase
   - Special characters are collected
3. **Concatenation Logic**: 
   - Extracts all alphabetic characters
   - Reverses the order
   - Applies alternating caps (lowercase for even indices, uppercase for odd)



## File Structure

```
vit-fullstack-api/
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── test.js           # Test file
├── README.md         # This file
└── vercel.json       # Vercel deployment config (if using Vercel)
```
