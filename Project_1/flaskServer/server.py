from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql

app = Flask(__name__)
CORS(app)

DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "",  # Add password if needed
    "database": "e_commerce"
}

def initialize_database():
    try:
        conn = pymysql.connect(
            host=DB_CONFIG["host"],
            user=DB_CONFIG["user"],
            password=DB_CONFIG["password"]
        )
        cursor = conn.cursor()

        cursor.execute("CREATE DATABASE IF NOT EXISTS e_commerce")
        conn.select_db(DB_CONFIG["database"])

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
            )
        """)
        conn.commit()
    except Exception as e:
        print("Database init error:", e)
    finally:
        conn.close()

initialize_database()

def get_db():
    return pymysql.connect(**DB_CONFIG, cursorclass=pymysql.cursors.DictCursor)

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not all([name, email, password]):
        return jsonify({"success": False, "message": "All fields are required"}), 400

    try:
        conn = get_db()
        cursor = conn.cursor()

        cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
        if cursor.fetchone():
            return jsonify({"success": False, "message": "Email already registered"}), 400

        cursor.execute(
            "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
            (name, email, password)
        )
        conn.commit()
        return jsonify({"success": True, "message": "Registered"}), 201
    except Exception as e:
        print("Register error:", e)
        return jsonify({"success": False, "message": "Registration failed"}), 500
    finally:
        conn.close()

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not all([email, password]):
        return jsonify({"success": False, "message": "Email and password are required"}), 400

    try:
        conn = get_db()
        cursor = conn.cursor()

        cursor.execute(
            "SELECT id, name FROM users WHERE email = %s AND password = %s",
            (email, password)
        )
        user = cursor.fetchone()

        if user:
            return jsonify({
                "success": True,
                "message": "Login successful",
                "user": {
                    "id": user['id'],
                    "name": user['name'],
                    "email": email
                }
            }), 200
        else:
            return jsonify({"success": False, "message": "Invalid credentials"}), 401

    except Exception as e:
        print("Login error:", e)
        return jsonify({"success": False, "message": "Login failed"}), 500
    finally:
        conn.close()

if __name__ == '__main__':
    app.run(debug=True)
