from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Table, Column, Integer, String, create_engine, Sequence, ForeignKey
from sqlalchemy.orm import sessionmaker, relationship
import os

postgresql_uri=os.environ['DATABASE_URL']
engine=create_engine(postgresql_uri)

Session = sessionmaker(bind=engine)
db = Session()

def createTables():
    db.execute("""CREATE table if not exists userdata(\
                                id serial unique primary key,\
                                username text not null unique,\
                                password text not null,\
                                role text not null);""")

    db.execute("""CREATE table if not exists mentee(\
                                    id integer references userdata(id) primary key,\
                                    username text not null references userdata(username),\
                                    industry text not null,\
                                    market text not null,\
                                    help text not null,\
                                    location text not null,\
                                    pitch text not null,\
                                    commitment text not null,\
                                    experience text not null);""")

    db.execute("""CREATE table if not exists mentor(\
                                id integer references userdata(id) primary key,\
                                username text not null references userdata(username),\
                                industry text not null,\
                                help text not null,\
                                location text not null,\
                                contribute text not null,\
                                commitment text not null,\
                                experience text not null);""")
    db.commit()

createTables()
