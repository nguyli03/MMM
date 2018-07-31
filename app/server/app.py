from flask import Flask, render_template, request, Response, jsonify, session, redirect
import requests
import json
import os
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Table, Column, Integer, String, create_engine, Sequence, ForeignKey
from sqlalchemy.orm import sessionmaker, relationship
import hashlib, uuid

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

Base=declarative_base()
postgresql_uri=os.environ['DATABASE_URL']
app.secret_key=os.environ['SECRET_KEY']
salt = os.environ['SALT']
engine=create_engine(postgresql_uri)

Session = sessionmaker(bind=engine)
db = Session()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('index.html')

@app.route('/loginHelper', methods = ['POST'])
def loginHelper():
    data = request.get_json(silent=True)
    item = {'username': data.get('inputusername'), 'password': data.get('inputpassword')}
    hashed_password = hashlib.sha512(item['password'].encode('utf-8') + salt.encode('utf-8')).hexdigest()
    res =  db.execute("""SELECT id, password from userdata where username = '%s';"""%(item['username']))
    res = res.fetchall()
    if len(res[0][0]) > 0 and len(res[0][1]) > 0:
        if hashed_password == res[0][1]:
            return '/'
    return '/login'

@app.route('/signup')
def signup():
    return render_template('index.html')

@app.route('/signupHelper', methods = ['POST'])
def signupHelper():
    data = request.get_json(silent=True)
    item = {'username': data.get('inputusername'), 'password': data.get('inputpassword'),'retypepassword': data.get('inputretypepassword')}
    if len(item['username'])<1 or len(item['password'])<1:
        return 'errorNull'
    if item['password'] != item['retypepassword']:
        return 'passwordError'
    hashed_password = hashlib.sha512(item['password'].encode('utf-8') + salt.encode('utf-8')).hexdigest()
    item['password'] = hashed_password
    res = db.execute("""SELECT id, password from userdata where username = '%s';"""%(item['username']))
    res = res.fetchall()
    if len(res) >0:
        return '/login'
    else:
        db.execute("""INSERT into userdata(username, password) VALUES ('%s','%s');"""%(item['username'],item['password']))
        db.commit()

        # session['username'] = item['username']
        # session['logged_in'] = True
    return '/'

if __name__=='__main__':
    app.run(debug=True)
