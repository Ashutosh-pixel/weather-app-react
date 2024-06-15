
## How To Get Weather API

1. Sign Up: Create an account on the OpenWeather website if you haven't already. You can sign up at OpenWeather.

2. Log In: Once you have created an account, log in to the OpenWeather platform using your credentials.

3. API Keys: Navigate to the API keys section. This is where you generate and manage your API keys. Look for options related to "API keys", "My API keys", or similar in your account dashboard.

4. Generate API Key: Click on the option to generate a new API key. You may be prompted to select the type of API key (free or paid, depending on your needs and subscription plan).






## API Reference

#### Get Current Weather

```http
  https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `city name` | `string` | **Required**. City Name |
| `API key` | `string` | **Required**. Your API key |

#### Get Hourly Forecast 5 days

```http
  https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `city name` | `string` | **Required**. City Name |
| `API key` | `string` | **Required**. Your API key |


#### IMPORTANT NOTE
Add `appid = YOUR API KEY` in `Weather.jsx` file in `/Components folder`
At `Line No : 59 and 67`


## How To Run 


1. Move in the Root Folder for Weather app
2. In the root folder open terminal or powershell and type command `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` hit enter. 
4. After that type another command `json-server --watch db.json --port 3001` hit enter now JSON server start running.
5. Now move in `/Frontend folder` again open seprate terminal or powershell and type a command `npm i` to install all packages.
6. To run the code `npm run dev`
