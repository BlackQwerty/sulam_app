# Implementation Plan: Bottom Nav & Weather API

## Tasks Overview

### 1. Add Bottom Navigation Bar to All Screens ✅ (Partial)
**Completed:**
- ✅ NewSaleScreen

**Remaining:**
- PineBotScreen
- OrderTrackingScreen  
- FarmerDashboardScreen
- WeatherAdvisoryScreen
- PaymentManagementScreen

### 2. Replace Profile Icon with Back Button ✅ (Partial)
**Completed:**
- ✅ NewSaleScreen

**Remaining:**
- Same screens as above

### 3. Integrate Real Weather API
**Weather API Options (Free):**
- OpenWeatherMap API (https://openweathermap.org/api)
  - Free tier: 1,000 calls/day
  - Requires API key (free signup)
  
**Implementation:**
- Add weather API service
- Fetch real-time weather data
- Support multiple farm locations
- Cache weather data

### 4. Location Management
**Features:**
- Add new farm locations
- Remove locations
- Select active location
- Store locations in AsyncStorage
- Display in FarmLocationScreen and WeatherAdvisoryScreen

## Priority Order
1. Add BottomNavBar to remaining screens (HIGH)
2. Add back buttons to remaining screens (HIGH)
3. Integrate weather API (MEDIUM)
4. Add location management (MEDIUM)
