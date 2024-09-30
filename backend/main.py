from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import boto3
from botocore.exceptions import NoCredentialsError

app = FastAPI()

# AWS credentials
ACCESS_KEY = 'AKIAQ3EGRVBL7CUOOFJP'
SECRET_KEY = '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'
REGION = 'ap-south-1'  # Mumbai region

# Create a DynamoDB client
dynamodb = boto3.resource(
    'dynamodb', aws_access_key_id=ACCESS_KEY,
    aws_secret_access_key=SECRET_KEY,
    region_name=REGION)

table_name = 'dhamijha'

class User(BaseModel):
    email: str
    password: str

@app.post("/register")
async def register_user(user: User):
    try:
        table = dynamodb.Table(table_name)
        existing_user = table.get_item(Key={'email': user.email})
        if existing_user.get('Item'):
            raise HTTPException(status_code=400, detail="User already exists")
        table.put_item(Item={'email': user.email, 'password': user.password})
        return JSONResponse(status_code=201, content={"message": "User created successfully"})
    except NoCredentialsError:
        raise HTTPException(status_code=401, detail="Invalid AWS credentials")

@app.post("/login")
async def login_user(user: User):
    try:
        table = dynamodb.Table(table_name)
        existing_user = table.get_item(Key={'email': user.email})
        if not existing_user.get('Item'):
            raise HTTPException(status_code=401, detail="Invalid email or password")
        if existing_user['Item']['password'] != user.password:
            raise HTTPException(status_code=401, detail="Invalid email or password")
        return JSONResponse(status_code=200, content={"message": "Login successful"})
    except NoCredentialsError:
        raise HTTPException(status_code=401, detail="Invalid AWS credentials")
