import requests

def fetch_data(option):
  url = f"https://swapi.mimo.dev/api/{option}/"
  data = []
  try:
    response = requests.get(url)
    response.raise_for_status()
    data = response.json()
    print(f"Successfully fetched {len(data)} entities")
  except requests.HTTPError as e:
    return None
  return data 
option = input("Quais dados de StarWars voce gostaria de explorar? Pessoas ou Planetas? ").strip().lower()
data = fetch_data(option)


if data:
  for result in data:
    print(result["name"])
else:
  print("Unable to download data")