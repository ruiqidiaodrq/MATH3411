from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from functions import *

app = FastAPI()
    
# Add CORS middleware to allow requests from React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://localhost:5173",
        "https://math-3411-git-main-ruiqidiaodrqs-projects.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
    expose_headers=["*"]
)

# LZ78 Encoding
@app.post("/lz78_encoding/")
async def lz78_encoding(request: Request):
    data = await request.json()
    message = data.get("message", "") 
    return {"encoded_output": LZ78_encoding(message)} 

# ISBN Checker
@app.post("/isbn_checker/")
async def isbn_checker(request: Request):
    data = await request.json()
    isbn = data.get("isbn", "") 
    return {"result": given_wrong_digit_isbn(isbn, given=-1)}

# Shannon Entropy
@app.post("/shannon_entropy/")
async def shannon_entropy_calculate(request: Request):
    data = await request.json()
    prob = data.get("prob", "") 
    radix = data.get("radix", "")
    return {"result": shannon_entropy(prob, radix)}

# Shannon Average Length
@app.post("/shannon_average/")
async def shannon_average_calculate(request: Request):
    data = await request.json()
    prob = data.get("prob", "") 
    radix = data.get("radix", "")
    return {"result": shannon_average(prob, radix)}

# Kraft McMillan Condition
@app.post("/Kraft_McMillan/")
async def Kraft_McMillan(request: Request):
    data = await request.json()
    length = data.get("length", "") 
    radix = data.get("radix", "")
    return {"result": kraft_mcmillan(radix, length)}

# Prime Checker
@app.post("/prime_checker/")
async def prime_checker(request: Request):
    data = await request.json()
    number = data.get("number", "")
    return {"result": trial_division(number)}

# Euler's Totient
@app.post("/euler_totient/")
async def euler_totient_check(request: Request):
    data = await request.json()
    number = data.get("number", "")
    return {"result": euler_totient(number)}

# Arithmetic Encoding
@app.post("/arithmetic_encoding/")
async def arithmetic_encoding_calculate(request: Request):
    data = await request.json()
    src = data.get("src", "")
    prob = data.get("prob", "")
    result = arithmetic_encoding(src, prob)
    return {"start": result[0],
            "end": result[1],
            "width": result[2]}
    
    pseudo_prime(a, n)
# Pseudo-prime
@app.post("/pseudoprime/")
async def arithmetic_encoding_calculate(request: Request):
    data = await request.json()
    a = data.get("a", "")
    n = data.get("n", "")
    return {"result": pseudo_prime(a, n)}
    
# # Arithmetic Decoding
# @app.post("/arithmetic_decoding/")
# async def arithmetic_decoding_calculate(request: Request):
#     data = await request.json()
#     src = data.get("src", "")
#     prob = data.get("prob", "")
#     scale = data.get("scale", "")
#     return {"result": arithmetic_decoding(src, prob, scale)}