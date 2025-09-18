# Doc-Wok - AI-Powered Health Insights Platform

> **Empowering individuals with AI-driven health insights and personalized medical guidance**

Doc-Wok is an intelligent health platform that leverages Google's Gemini AI to provide personalized health insights, symptom analysis, and preventive care recommendations based on user health data.

## 🚀 Features

### **Current Features (v1.0)**
- **User Authentication**: Secure registration, login with JWT tokens
- **Health Profile Management**: Comprehensive health data storage
- **AI Health Analysis**: Gemini AI-powered health insights and recommendations
- **Symptom Checker**: Real-time symptom analysis with urgency assessment
- **Medical History Tracking**: Conditions, medications, allergies, family history
- **Vital Signs Monitoring**: Blood pressure, heart rate, temperature tracking

### **Coming Soon**
- **React Frontend Dashboard**
- **Health Goal Tracking**
- **Medication Reminders**
- **Medical Report Upload**
- **Doctor Consultation Booking**
- **Wearable Device Integration**
- **Mobile App (React Native)**

## 🛠️ Tech Stack

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- Google Gemini AI API
- JWT Authentication
- ES6 Modules

**Frontend (Planned):**
- React.js
- Tailwind CSS
- Chart.js for analytics
- Axios for API calls

## 📁 Project Structure

```
DocWok/
├── controllers/
│   ├── user.controller.js       # User authentication logic
│   └── health.controller.js     # Health data & AI analysis
├── models/
│   ├── user.model.js           # User schema
│   └── healthProfile.model.js  # Health profile schema
├── routes/
│   ├── auth.route.js           # Authentication routes
│   └── health.route.js         # Health-related routes
├── middlewares/
│   └── auth.middleware.js      # JWT verification
├── src/
│   └── index.js               # Main server file
├── .env                       # Environment variables
└── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB
- Google Gemini API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shanky0007/Doc-Wok.git
   cd Doc-Wok
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/docwok
   ACCESS_TOKEN_SECRET=your_jwt_secret_here
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   REFRESH_TOKEN_EXPIRY=10d
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Get Gemini API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add it to your `.env` file

5. **Start the server**
   ```bash
   npm start
   ```

The server will run on `http://localhost:8000`

## 📚 API Documentation

### Authentication Endpoints
```http
POST /api/v1/users/register     # User registration
POST /api/v1/users/login        # User login
GET  /api/v1/users/me          # Get current user (protected)
```

### Health Endpoints
```http
POST /api/v1/health/profile     # Create health profile
GET  /api/v1/health/profile     # Get health profile
PUT  /api/v1/health/profile     # Update health profile
POST /api/v1/health/analyze     # AI health analysis
POST /api/v1/health/symptoms    # Symptom checker
```

### Sample API Calls

**Create Health Profile:**
```json
POST /api/v1/health/profile
Authorization: Bearer <jwt_token>

{
  "personalInfo": {
    "age": 25,
    "gender": "MALE",
    "height": 175,
    "weight": 70,
    "bloodType": "O+"
  },
  "medicalHistory": {
    "conditions": ["Asthma"],
    "medications": ["Inhaler"],
    "allergies": ["Peanuts"]
  }
}
```

**AI Health Analysis:**
```json
POST /api/v1/health/analyze
Authorization: Bearer <jwt_token>

{
  "symptoms": "Persistent headaches with nausea",
  "healthData": {
    "severity": 6,
    "duration": "3 days"
  }
}
```

## 🧪 Testing

### Using Postman
1. Import the API collection from `/docs/postman/`
2. Set environment variables:
   - `base_url`: `http://localhost:8000/api/v1`
   - `access_token`: (auto-populated after login)

### Test Scenarios
- User registration and authentication
- Health profile CRUD operations
- AI-powered symptom analysis
- Health insights generation

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Encryption**: BCrypt password hashing
- **Data Validation**: Mongoose schema validation
- **CORS Protection**: Cross-origin request handling
- **Environment Variables**: Sensitive data protection

## Database Schema

### User Model
```javascript
{
  fullName: String,
  email: String (unique),
  username: String (unique),
  password: String (hashed),
  avatar: String,
  refreshToken: String
}
```

### Health Profile Model
```javascript
{
  userId: ObjectId (ref: User),
  personalInfo: { age, gender, height, weight, bloodType },
  medicalHistory: { conditions, medications, allergies, surgeries },
  currentSymptoms: [{ symptom, severity, duration }],
  vitalSigns: [{ bloodPressure, heartRate, temperature }]
}
```

## 🤖 AI Integration

**Gemini AI Features:**
- **Health Analysis**: Comprehensive health risk assessment
- **Symptom Checking**: Real-time symptom evaluation
- **Personalized Recommendations**: Tailored health advice
- **Urgency Detection**: Emergency situation identification

**Sample AI Response:**
```json
{
  "analysis": "Based on your symptoms and medical history...",
  "urgencyLevel": "Medium",
  "recommendations": ["Rest", "Hydration", "Monitor symptoms"],
  "disclaimer": "This is AI-generated advice. Consult healthcare professionals."
}
```

## Roadmap

### Phase 1: Backend API 
- [x] User authentication
- [x] Health profile management
- [x] AI integration (Gemini)
- [x] Symptom checker
- [x] API documentation

### Phase 2: Frontend Development 
- [ ] React.js dashboard
- [ ] User interface design
- [ ] Health data visualization
- [ ] Responsive design

### Phase 3: Advanced Features 
- [ ] File upload (medical reports)
- [ ] Real-time notifications
- [ ] Doctor consultation booking
- [ ] Wearable device integration
- [ ] Mobile app (React Native)

### Phase 4: Production & Scaling 
- [ ] Docker containerization
- [ ] Cloud deployment (AWS/Azure)
- [ ] CI/CD pipeline
- [ ] Performance optimization
- [ ] Load testing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Author

**Shashank Pandey** - [@Shanky0007](https://github.com/Shanky0007)

## Contact

- Email: sp777216@gmail.com
- LinkedIn: (www.linkedin.com/in/shashank-pandey-29473228b)
- Project Link: (https://github.com/Shanky0007/Doc-Wok)

## Disclaimer

Doc-Wok is designed for informational purposes only and should not replace professional medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare providers with questions about medical conditions.

## Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) for powerful AI capabilities
- [MongoDB](https://www.mongodb.com/) for database solutions
- [Express.js](https://expressjs.com/) for the web framework
- Open source community for inspiration and support

---

⭐ **Star this repository if you find it helpful!**
