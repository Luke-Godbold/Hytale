import re
import os
import bcrypt
from flask import Flask, jsonify, session, request
from flask_cors import CORS
from dotenv import load_dotenv
import sqlite3

# 28/01/2026
# made the sign up backend
# made the sign in backend
# 02/02/2026
# made the get guides backend
# 03/02/2026
# Made a request to get all the content for a guide from the database

load_dotenv("SECRET.env")
secret_key = os.getenv("SECRET_KEY")

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.secret_key = os.getenv("SECRET_KEY")

@app.route("/API/SignUp", methods=["POST"])
def SignUp():
    # Gets all of the data that has been passed in from the frontend
    data = request.get_json()
    email = data.get("email")
    name = data.get("name")
    passw = data.get("pass")
    cPassw = data.get("cPass")

    # checks that no inputs are blank and returns an error code if they are
    if not all ([email,name,passw,cPassw]):
        return jsonify({"res":400, "message":"Fill in all the boxes"})
    
    # sets email to lower case
    email = email.lower()

    # connects to the database
    conn = sqlite3.connect("Database.db")
    cur = conn.cursor()

    # attempts to get the users email from the database to see if its already in use
    cur.execute("SELECT email FROM Users WHERE email = ?",(email,))    
    emailExists = cur.fetchone()

    # returns an error if the name is already in use
    if emailExists:
        conn.close()
        return jsonify({"res":409, "message":"Email already in use"})
    
    if passw != cPassw:
        conn.close()
        return jsonify({"res":400, "message":"Passwords do not match"})
    
    # checks if the password is complex enough
    reg = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#%!?()/.,;$£&*])[A-Za-z\d@$#%!?()/.,;$£&*]{8,20}$"
    pat = re.compile(reg)
    valid = re.search(pat, passw)

    if not valid:
        conn.close()
        return jsonify({"res":400, "message":"Passwords must contain 8-20 characters atleast 1 lowercase letter, uppercase letter, number, special character"})
    
    # combines the password and the secret key
    pepered = (passw + secret_key).encode('UTF-8')
    # Generates a random string
    salt = bcrypt.gensalt()

    # Salts the passord so its encrypted
    salted = bcrypt.hashpw(pepered, salt)

    cur.execute("INSERT INTO Users (u_name, email, passw) VALUES (?, ?, ?)",(name, email, salted))
    conn.commit()
    conn.close()
    return jsonify({"res":201, "message":"Successfully signed Up"})


@app.route("/API/SignIn", methods=["POST"])
def SignIn():
    # Gets all of the data that has been passed in from the frontend
    data = request.get_json()
    email = data.get("email")
    passw = data.get("pass")

    # checks that no inputs are blank and returns an error code if they are
    if not all ([email,passw]):
        return jsonify({"res":400, "message":"Fill in all the boxes"})
    
    # sets email to lower case
    email = email.lower()

    # connects to the database
    conn = sqlite3.connect("Database.db")
    cur = conn.cursor()

    # attempts to get the users info from the database to see if its exists 
    cur.execute("SELECT * FROM Users WHERE email = ?",(email,))    
    details = cur.fetchone()

    # Returns an error if the request to the databse came back empty
    if not details:
        conn.close()
        return jsonify({"res":400, "message":"Your email or password is incorrect"})
    
    # makes a variable for the correct password to the users account
    correctPassword = details[3]
    
    # returns if the user has entered the corrrect password
    pepered = (passw + secret_key).encode('UTF-8')
    correct = bcrypt.checkpw(pepered, correctPassword)


    if correct:
        session["U_id"] = details[0]
        conn.close()
        return jsonify({"res":200, "message":"Successfully signed in"})
    
    else:
        conn.close()
        return jsonify({"res":400, "message":"Your email or password is incorrect"})

# Signs the user out
@app.route("/API/SignOut", methods=["GET"])
def SignOut():
    # clears the user session
    try:
        if session["U_id"]:
            session.clear()
            return jsonify({"res":200, "message":"Successfully signed out"})
    except KeyError:
        return jsonify({"res":401, "message":"You aren't signed in"})

# checks if the user is signed in
@app.route("/API/SignedInCheck", methods=["GET"])
def SignedInCheck():
    try:
        if session["U_id"]:
            return jsonify({"res":200, "message":"User is signed in"})
    except KeyError:
        return jsonify({"res":401, "message":"User is not signed in"})

@app.route("/API/GetGuides")
def Guides(): 
    # connects to the database
    conn = sqlite3.connect("Database.db")
    cur = conn.cursor()

    # gets the guides from the database
    cur.execute("SELECT * FROM Guides")    
    guides = cur.fetchall()
    print(guides)
    # closes the connection to the database
    conn.close()

    # sends the guides to the frontend
    return jsonify({"res":200, "guides":guides})

@app.route("/API/GetGuideContent", methods=["POST"])
def GuideContent():
    data = request.get_json()
    g_id = data.get("g_id")
    # connects to the database
    conn = sqlite3.connect("Database.db")
    cur = conn.cursor()

    # gets the guide content from the database sorted by the num column
    cur.execute("SELECT * FROM Content WHERE g_id = ? ORDER BY num", (g_id,))    
    content = cur.fetchall()
    print(content)
    # closes the connection to the database
    conn.close()
            
    # sends the guides to the frontend
    return jsonify({"res":200, "content":content})

if __name__ == "__main__":
    app.run()