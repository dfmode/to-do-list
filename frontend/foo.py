import requests

print(
    requests.post(
        "http://139.177.183.232:3000/register",
        json={"username": "hooooo", "password": "22222fA1sfaads!"}).text
)

# print(
#     requests.post(
#         "http://139.177.183.232:3000/logout",
#         headers={"authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imhvb29vIiwiaWF0IjoxNjYzODc3NzcxLCJleHAiOjE2NjM5NjQxNzF9.RY9WFyy5wfFVvSEcOtCbJ3aPAGexQabxaqPOFnIbK-U"}).text
# )
