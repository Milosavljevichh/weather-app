# weather-app
Use:
•	Weather api
•	Async/await

Must contain:
•	Displaying in Celsius and Fahrenheit
•	Change the pages look based on the data (bg color, image describing the weather)

Limits:
•	Weather API will limit your forecast data to 3 days

Security:
•	Set your API keys on the server and never send them to the frontend In the first place 
•	For this specific project, getting an alert from github that we commited the API key publicly is okay since this API key is publicly available and there are no consequences for exposing it.
Workflow:
•	Design the project (figma)
•	Set up static html and the link to js and css files
•	Write functions which will take a location and return the weather data for that location (API)
•	Write functions that process the JSON data received by previously mentioned functions and return an object with only the required data
•	Set up a search bar that lets the users input their location which will be passed to the previously mentioned functions
•	Display the information and style it
•	(Bonus) Add ‘loading’ component that displays from the time the location is searched until the information comes back from the API (test for low-end devices with DevTools)
