# Weather API Subscription Service

This project is a Node.js-based REST API that allows users to subscribe to weather updates for a specific city. Subscribers receive weather information via email based on their selected frequency. The application integrates with WeatherAPI.com, stores subscriptions in PostgreSQL, and supports email confirmation/unsubscription. I made all of these in 2 hours with chatgpt, cause i don't know javascipt at all but i know how to program all of these in java so i quickly changed my stack. 
I don't have enough time for this project because I'm writing a diploma right now. So if I be selected for the next round, I will give for this more time.

## 📆 Stack & Technologies

* **Node.js + Express**: Web server
* **Sequelize**: ORM for PostgreSQL
* **PostgreSQL**: Database
* **WeatherAPI**: External weather data provider
* **Nodemailer**: Sending emails via Gmail SMTP
* **Jest + Supertest**: Unit & integration testing
* **Docker**: Containerization with `docker-compose`

## 🔧 Features Implemented

* Subscribe to weather updates (POST `/api/subscribe`)
* Confirm subscription via token (GET `/api/confirm/:token`)
* Unsubscribe via token (GET `/api/unsubscribe/:token`)
* Get current weather by city (GET `/api/weather?city=`)
* Scheduled email notifications (via cron job)
* Input validation and error handling
* Extensive logging for controller and service actions

## 📚 Project Structure

```
├── controllers/          # Express route handlers
├── services/             # Business logic
├── models/               # Sequelize models
├── schedules/            # Cron job for weather emailing
├── utils/                # Validators, helpers
├── tests/                # Unit and integration tests
├── app.js                # Express app setup
├── Dockerfile            # Node app container
├── docker-compose.yml    # Full stack containerization
├── .env                  # Environment variables
```

## 🌐 Environment Variables (.env)

```ini
WEATHER_API_KEY=your_weather_api_key
WEATHER_API_URL=http://api.weatherapi.com/v1/current.json

DB_USER=postgres
DB_PASS=password
DB_NAME=weatherapi_dev
DB_HOST=db
DB_PORT=5432

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password
```

## 🚀 Run the App with Docker

```bash
docker-compose up --build
```

* App available at `http://localhost:3000`
* PostgreSQL runs inside the `db` container

## ✅ Database Sync

The database is auto-synced on app startup via Sequelize.

## 🌐 API Routes

| Method | Route                     | Description                   |
| ------ | ------------------------- | ----------------------------- |
| GET    | `/api/weather?city=Kyiv`  | Get current weather for city  |
| POST   | `/api/subscribe`          | Subscribe to weather updates  |
| GET    | `/api/confirm/:token`     | Confirm subscription by token |
| GET    | `/api/unsubscribe/:token` | Unsubscribe from updates      |

Example of mail content:

![Картинка з Imgur](https://i.imgur.com/Wt8K2Uy.png)



## ✏️ Testing

### Run all tests:

```bash
npm test
```

### Using Jest + Supertest:

* Mocks external APIs and email service
* Uses `NODE_ENV=test` to skip DB connection

## 📄 GitHub Integration

### Typical setup:

```bash
git init
git remote add origin https://github.com/your-username/WeatherApi.git
git add .
git commit -m "Initial commit"
git push -u origin main --force
```
