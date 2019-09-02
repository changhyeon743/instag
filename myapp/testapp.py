import requests
import re
import json
from bs4 import BeautifulSoup
url = "https://www.instagram.com/explore/tags/Facebook"
response = requests.get(url)
soup = BeautifulSoup(response.content, "html.parser")
# sel = soup.select('body > script:not([src])')[0]
script = soup.find('body > script:not([src])', text=re.compile('window\._\.sharedData'))
print(script)
# sel = sel.text.find("config")
# p = sel.config
# print(sel)

# soup = BeautifulSoup(s, "html.parser")
# element = soup.find("div", class_="header-product js-header-product")
# print element.attrs["data-product"]
# jsonData = json.loads(element.attrs["data-product"])    #Convert to JSON Object.
# print jsonData['sku']
