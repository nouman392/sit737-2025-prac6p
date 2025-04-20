const express = require('express');

const winston = require('winston');
const app = express();

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});


// Middleware to parse JSON requests
app.use(express.json());

// Define arithmetic operation endpoints
app.get('/add', (req, res) => {
    const { num1, num2 } = req.query;
    if (!num1 || !num2) {
        logger.error("Missing parameters for addition");
        return res.status(400).json({ error: "Missing parameters" });
    }
    const result = parseFloat(num1) + parseFloat(num2);
    logger.info(`Addition operation: ${num1} + ${num2} = ${result}`);
    res.json({ result });
});

app.get('/subtract', (req, res) => {
    const { num1, num2 } = req.query;
    if (!num1 || !num2) {
        logger.error("Missing parameters for addition");
        return res.status(400).json({ error: "Missing parameters" });
    }
    const result = parseFloat(num1) + parseFloat(num2);
    logger.info(`subtract operation: ${num1} - ${num2} = ${result}`);
    res.json({ result });
});
app.get('/multiply', (req, res) => {
    const { num1, num2 } = req.query;
    if (!num1 || !num2) {
        logger.error("Missing parameters for addition");
        return res.status(400).json({ error: "Missing parameters" });
    }
    res.json({ result: parseFloat(num1) * parseFloat(num2) });
    logger.info(`multiply operation: ${num1} - ${num2} = ${result}`);
    res.json({ result });
});

app.get('/divide', (req, res) => {
    const { num1, num2 } = req.query;
    if (!num1 || !num2) {
        logger.error("Missing parameters for addition");
        return res.status(400).json({ error: "Missing parameters" });
    }
    if (parseFloat(num2) === 0) {
        return res.status(400).json({ error: "Cannot divide by zero" });
    }
    res.json({ result: parseFloat(num1) / parseFloat(num2) });
    logger.info(`divide operation: ${num1} - ${num2} = ${result}`);
    res.json({ result });
});
app.get('/exponentiation', (req, res) => {
    const { num1, num2 } = req.query;

    if (!num1 || !num2) {
        logger.error("Missing parameters for exponentiation");
        return res.status(400).json({ error: "Missing parameters" });
    }

    const base = parseFloat(num1);
    const exponent = parseFloat(num2);

    if (isNaN(base) || isNaN(exponent)) {
        logger.error("Invalid input parameters for exponentiation");
        return res.status(400).json({ error: "Invalid input parameters" });
    }

    const result = Math.pow(base, exponent);
    
    logger.info(`Exponentiation operation: ${base}^${exponent} = ${result}`);
    res.json({ result });
});

app.get('/sqrt', (req, res) => {
    const { num } = req.query;

    if (!num) {
        logger.error("Missing parameter for square root");
        return res.status(400).json({ error: "Missing parameter" });
    }

    const number = parseFloat(num);

    if (isNaN(number) || number < 0) {
        logger.error("Invalid input for square root");
        return res.status(400).json({ error: "Invalid input. Square root of a negative number is not supported." });
    }

    const result = Math.sqrt(number);
    
    logger.info(`Square root operation: sqrt(${number}) = ${result}`);
    res.json({ result });
});

app.get('/modulo', (req, res) => {
    const { num1, num2 } = req.query;

    if (!num1 || !num2) {
        logger.error("Missing parameters for modulo operation");
        return res.status(400).json({ error: "Missing parameters" });
    }

    const dividend = parseFloat(num1);
    const divisor = parseFloat(num2);

    if (isNaN(dividend) || isNaN(divisor)) {
        logger.error("Invalid input parameters for modulo operation");
        return res.status(400).json({ error: "Invalid input parameters" });
    }

    if (divisor === 0) {
        logger.error("Attempted modulo by zero");
        return res.status(400).json({ error: "Modulo by zero is not allowed" });
    }

    const result = dividend % divisor;
    
    logger.info(`Modulo operation: ${dividend} % ${divisor} = ${result}`);
    res.json({ result });
});

// Logging middleware
app.use((req, res, next) => {
    logger.info(`Received request: ${req.method} ${req.url}`);
    next();
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Calculator microservice running on port ${PORT}`);
});
