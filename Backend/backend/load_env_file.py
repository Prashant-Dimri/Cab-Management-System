# load_env_file.py

from dotenv import load_dotenv
import os
from sqlalchemy import create_engine, Table, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Load environment variables from .env file
load_dotenv()

# Get the DATABASE_URL from the environment variables
DATABASE_URL = os.getenv("DATABASE_URL")

# Create the SQLAlchemy engine
engine = create_engine(DATABASE_URL, echo=True)

# Metadata to store table schema
metadata = MetaData()

# Reflect the existing 'user' table from the database
users_table = Table('user', metadata, autoload_with=engine)

# Create a Base class for the ORM
Base = declarative_base(metadata=metadata)

# Define the User class that maps to the 'user' table
class User(Base):
    __table__ = users_table  # Map the reflected table to the class

# Create a sessionmaker instance
Session = sessionmaker(bind=engine)

# Function to get a session
def get_session():
    return Session()

