// Enhanced backend registration endpoint
import { env } from '$env/dynamic/private'; 
import mariadb from 'mariadb';
import bcrypt from 'bcrypt'; 

const pool = mariadb.createPool({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    connectionLimit: parseInt(env.DB_CONN_LIMIT) || 5
});

console.log('Database connection pool created with limit:', env.DB_NAME);

export async function POST({ request }) {
    let conn;
    try {
        const { username, email, password } = await request.json();      
        if (!username || !email || !password) {
            return new Response(
                JSON.stringify({ error: "All fields are required" }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }
        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return new Response(
                JSON.stringify({ error: "Invalid email format" }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }
        console.log('Received registration request:', { username, email });
        
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        conn = await pool.getConnection();
        
        const existingUser = await conn.query(
            'SELECT * FROM users WHERE username = ? OR email = ?',
            [username, email]
        );
        
        if (existingUser.length > 0) {
            return new Response(
                JSON.stringify({ error: "Username or email already exists" }),
                {
                    status: 409,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        const result = await conn.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );
        
        console.log('Database insert result:', result);
        
        return new Response(
            JSON.stringify({ 
                success: true, 
                message: "User registered successfully" 
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        console.error("Error:", error);
        
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } finally {
        if (conn) {
            conn.release(); // Important: always release the connection
        }
    }
}

