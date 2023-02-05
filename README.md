# Weather-Forecast-Site
This is a complete project that uses the OpenWeather API to show weather forecast for any city.

    1) Dark Theme: Press the button in the right up corner and most of 
       the html elements activate their dark theme version (implemented
       using JS & CSS, not Bootstrap). Additionaly the background image is
       changed from an image of sunset to an image of a sunrise and the
       font colours are reversed accordingly. For the full implementation 
       you can check scripts/dark-theme-and-modals.js.

    2) Country and City selection: You can select different countries for your
       forecast search, additionaly for each country we fetch cities you can select.

       API used: https://countriesnow.space/api/v0.1/countries

       NOTE: Due to this extra field (Country) a dropdown list has been added.
       This changes the format and the size of the input form.

    3) General Info Tab: You are provided with general information about the 
       country you've selected to get a weather forecast on.
        
        3.1) Info Table: General information like the currency used, life expectancy
             GDP, population and a lot more are fetched by an API call.

             API used: https://api.api-ninjas.com/v1/country (more info on https://api-ninjas.com/api/country)

        3.2) Capital Card: An image of the capital city of the selected country and 
             some geographical information are presented. 

             NOTE: If no image for the capital is found the capital card is not presented
             and the info table fills the whole tab.

                           3.2.1) Image: The capital of the selected country is found
                                  using an API call.

                                  API used: https://countriesnow.space/api/v0.1/countries/capital (capital)
                                            https://api.teleport.org/api/urban_areas/slug:nicosia/images (image)


                           3.2.2) Mini-flag: A flag of the selected country is found
                                  using an API call.

                                  API used: https://countriesnow.space/api/v0.1/countries/flag/images (flag image)

                        
                           3.2.3) Geographical Info: Using the last api calls we create a string with 
                                  the capital of the country and the general are where the country is 
                                  located.
