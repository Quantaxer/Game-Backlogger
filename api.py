import requests
import re

def callAPI(extraParams):
    baseParams = {
        'format': 'json',
        'formatversion': '2'
    }
    headers = {
        'User-Agent': 'CIS*3210 WIKI TEST BOT'
    }
    params = {**baseParams, **extraParams}

    r = requests.get('http://en.wikipedia.org/w/api.php', params=params, headers=headers)
    return r.json()

def searchForPage(title):
    params = {
        'action': 'opensearch',
        'search': title
    }
    x = callAPI(extraParams=params)
    return(x)

def getPageSummary(title, numSentences):
    params = {
         'action': 'query',
         'prop': 'extracts',
         'titles': title,
         'redirects': 'true',
         'exintro': '',
         'explaintext': '',
         'exsentences': str(numSentences)
    }
    res = callAPI(extraParams=params)
    page = res['query']['pages'][0]['extract']
    return(page)

def getPageImage(title):
    params = {
        'action': 'query',
        'prop': 'pageimages',
        'titles': title,
        'redirects': 'true',
        'piprop':'original',
        'pilicense':'any'
    }
    res = callAPI(extraParams=params)
    return(res['query']['pages'][0]['original']['source'])

def getCategories(title):
    params = {
        'action': 'query',
        'prop': 'categories',
        'titles': title,
        'redirects': 'true',
        'cllimit': 'max'
    }
    res = callAPI(extraParams=params)
    return res['query']['pages'][0]['categories']

def isVideoGame(title):
    categories = getCategories(title)
    for category in categories:
        if bool(re.search("video game", category['title'], re.IGNORECASE)):
            return True
    
    return False