


export const login = async ({email, password}: {email: string, password: string}) => { 
    const login = await fetch("https://pureappproxypurposes.azurewebsites.net/api/pureProxy", {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
          "content-type": "application/json",
          "sec-ch-ua": `"Not_A Brand";v="99", "Microsoft Edge";v="109", "Chromium";v="109"`,
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "x-date": "1674825571000",
          "x-token": "da3e8afe3fa08df758553c32d207f854"
        },
        "referrer": "https://pure360.pure-fitness.com/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `{"username":"${email}","email": "${email}","password":"${password}","region_id":1,"language_id":"1","jwt":true}`,
        "method": "POST",
        "mode": "cors",
        "credentials": "omit"
      });
      const token = await login.json()
      const decodedToken = {jwt: token.data.user.jwt, xData: token.data.user.token}
      return decodedToken

}

export const getClass = async (token, locationIDs) => {
    let yourDate = new Date()
    yourDate = yourDate.toISOString().split('T')[0]
    const _classList = await fetch(`https://pureappproxypurposes.azurewebsites.net/api/pureGetClass?location_ids=${locationIDs}&region_id=1&start_date=${yourDate}&sector=F&days=5&language_id=1&api_version=3&jwt=${token.token.jwt}`, {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
    "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Microsoft Edge\";v=\"109\", \"Chromium\";v=\"109\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "x-date": "1674825571000",
    "x-features": "last_chance_booking",
    "x-jwt-token": token.token.jwt,
    "x-token": "da3e8afe3fa08df758553c32d207f854"
  },
  "referrer": "https://pure360.pure-fitness.com/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
});
const classList = _classList.json()
return classList
}

export const getLocation = async (token) => {
  const _locationList = await fetch(`https://pureappproxypurposes.azurewebsites.net/api/pureGetLocations?language_id=1&region_id=1&jwt=${token.token.jwt}`, {
"headers": {
  "accept": "application/json, text/plain, */*",
  "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
  "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Microsoft Edge\";v=\"109\", \"Chromium\";v=\"109\"",
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": "\"Windows\"",
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "cross-site",
  "x-date": "1674825571000",
  "x-features": "last_chance_booking",
  "x-jwt-token": token.token.jwt,
  "x-token": "da3e8afe3fa08df758553c32d207f854"
},
"referrer": "https://pure360.pure-fitness.com/",
"referrerPolicy": "strict-origin-when-cross-origin",
"body": null,
"method": "GET",
"mode": "cors",
"credentials": "omit"
});

const locationList = _locationList.json()
return locationList
}


export const book = async (token,id) => { 
  console.log(token)
  const book = await fetch("https://pureappproxypurposes.azurewebsites.net/api/pureBook", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
        "content-type": "application/json",
        "sec-ch-ua": `"Not_A Brand";v="99", "Microsoft Edge";v="109", "Chromium";v="109"`,
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "x-date": "1674825571000",
        "x-token": "da3e8afe3fa08df758553c32d207f854",
        "x-jwt-token": token.token.jwt,
        "x-features": "last_chance_booking",
      },
      "referrer": "https://pure360.pure-fitness.com/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": `{"language_id": "1","class_id": ${id},"book_type": 1,"booked_from": "WEB","region_id": "1", "jwt":"${token.token.jwt}"}`,
      "method": "POST",
      "mode": "cors",
      "credentials": "omit"
    });
    const result = await book.json()
    return result

}