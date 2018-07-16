from flask import Flask, render_template, request, Response, jsonify, session
import requests
import json
import os
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Table, Column, Integer, String, create_engine, Sequence, ForeignKey
from sqlalchemy.orm import sessionmaker, relationship
import hashlib, uuid

app = Flask(__name__)

Base=declarative_base()
postgresql_uri=os.environ['DATABASE_URL']
API_ID = os.environ['API_ID']
API_KEY = os.environ['API_KEY']
engine=create_engine(postgresql_uri)

Session = sessionmaker(bind=engine)
db = Session()

@app.route('/')
def index():
    return render_template('index.html')

if __name__=='__main__':
    app.run(debug=True)
