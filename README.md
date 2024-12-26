# Stock Exchange Application

## Run the Project

- run docker using `docker-compose up --build`.
- Access Application UI on `http://localhost:5173`

### Login Details
Some users are already created in the database. You can use the following credentials to login:
- **username** - `admin`
- **password** - `admin`  
or
- **username** - `user`
- **password** - `user`

You can use API to create more users `POST /api/v1/auth/user` with `{username, password}` in the body.

### Existing API
- **GET** `/api/v1/exchanges` - Get all stock exchanges
- **POST** `/api/v1/exchanges` - Create new exchange, body `{name, description}`
- **POST** `/api/v1/exchanges/:exchangeId/stocks` - add existing stock into stock exchange, body `{id}`
- **GET** `/api/v1/exchanges/:exchangeId/stocks` - Get all stock by stock exchange
- **GET** `/api/v1/stocks` - Get all stocks
- **POST** `/api/v1/stocks` - Create new stock, body `{name, description, currentPrice}`

### additional info
- Project is divided into two parts
  - **server** - backend project
  - **client** - frontend project
- Project already populated with soma date in Stocks and Stock Exchanges tables
- API details in **README.md** file of **'server'** project
- details about UI in **README.md** file of **'client'** project

### TODO
* Create a transactions package to handle transactions with selling and buying Stocks in the Stock Exchange Market.
* Store and manipulate with Stocks for different users
* Add Graphs to show the stock price history
* Add Graphs about Market state to dashboard to make it more interactive, friendly, informative
* Add more validations to API :
   * check if stock already exists in exchange
   * adding validation about body data and data types to all API
* Create a service to handle errors on API and generate a proper response with error
* Add more test cases