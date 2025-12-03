import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface WeatherAdvisoryScreenProps {
    onNavigateHome: () => void;
}

// Mock Data
const currentWeather = {
    temp: 32,
    condition: 'Partly Cloudy',
    humidity: '75%',
    wind: '12 km/h',
    rainfall: '0 mm',
    location: 'Alor Gajah Farm',
};

const forecast = [
    { day: 'Today', temp: 32, icon: 'weather-partly-cloudy' },
    { day: 'Tue', temp: 31, icon: 'weather-rainy' },
    { day: 'Wed', temp: 33, icon: 'weather-sunny' },
    { day: 'Thu', temp: 30, icon: 'weather-cloudy' },
    { day: 'Fri', temp: 29, icon: 'weather-pouring' },
    { day: 'Sat', temp: 31, icon: 'weather-partly-cloudy' },
    { day: 'Sun', temp: 32, icon: 'weather-sunny' },
];

const advisories = [
    {
        type: 'Planting',
        title: 'Good for Planting',
        description: 'Soil moisture is optimal. Good time to plant new slips.',
        icon: 'sprout',
        color: '#2E7D32',
        bgColor: '#E8F5E9',
    },
    {
        type: 'Irrigation',
        title: 'Watering Needed',
        description: 'No rain expected today. Ensure irrigation systems are active.',
        icon: 'water',
        color: '#1565C0',
        bgColor: '#E3F2FD',
    },
    {
        type: 'Pest Alert',
        title: 'High Humidity',
        description: 'Watch out for fungal infections due to high humidity levels.',
        icon: 'bug',
        color: '#C62828',
        bgColor: '#FFEBEE',
    },
];

const alerts = [
    {
        severity: 'Warning',
        title: 'Heavy Rain Expected',
        time: 'Tuesday, 2:00 PM',
        description: 'Prepare drainage systems for heavy rainfall tomorrow afternoon.',
    },
];

const WeatherAdvisoryScreen = ({ onNavigateHome }: WeatherAdvisoryScreenProps) => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onNavigateHome} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Weather Advisory</Text>
                <TouchableOpacity>
                    <Ionicons name="share-social-outline" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Location Selector */}
                <TouchableOpacity style={styles.locationSelector}>
                    <Ionicons name="location" size={20} color="#04383f" />
                    <Text style={styles.locationText}>{currentWeather.location}</Text>
                    <Ionicons name="chevron-down" size={20} color="#666" />
                </TouchableOpacity>

                {/* Current Weather Card */}
                <View style={styles.weatherCard}>
                    <View style={styles.weatherMain}>
                        <View>
                            <Text style={styles.tempText}>{currentWeather.temp}°C</Text>
                            <Text style={styles.conditionText}>{currentWeather.condition}</Text>
                        </View>
                        <MaterialCommunityIcons name="weather-partly-cloudy" size={80} color="#FFB74D" />
                    </View>
                    <View style={styles.weatherDetails}>
                        <View style={styles.weatherDetailItem}>
                            <MaterialCommunityIcons name="water-percent" size={20} color="#666" />
                            <Text style={styles.detailValue}>{currentWeather.humidity}</Text>
                            <Text style={styles.detailLabel}>Humidity</Text>
                        </View>
                        <View style={styles.weatherDetailItem}>
                            <MaterialCommunityIcons name="weather-windy" size={20} color="#666" />
                            <Text style={styles.detailValue}>{currentWeather.wind}</Text>
                            <Text style={styles.detailLabel}>Wind</Text>
                        </View>
                        <View style={styles.weatherDetailItem}>
                            <MaterialCommunityIcons name="weather-rainy" size={20} color="#666" />
                            <Text style={styles.detailValue}>{currentWeather.rainfall}</Text>
                            <Text style={styles.detailLabel}>Rainfall</Text>
                        </View>
                    </View>
                </View>

                {/* 7-Day Forecast */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>7-Day Forecast</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.forecastList}>
                        {forecast.map((day, index) => (
                            <View key={index} style={styles.forecastItem}>
                                <Text style={styles.forecastDay}>{day.day}</Text>
                                <MaterialCommunityIcons name={day.icon as any} size={28} color="#555" />
                                <Text style={styles.forecastTemp}>{day.temp}°</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* Farming Recommendations */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Farming Recommendations</Text>
                    {advisories.map((advisory, index) => (
                        <View key={index} style={[styles.advisoryCard, { backgroundColor: advisory.bgColor }]}>
                            <View style={[styles.advisoryIcon, { backgroundColor: '#FFF' }]}>
                                <MaterialCommunityIcons name={advisory.icon as any} size={24} color={advisory.color} />
                            </View>
                            <View style={styles.advisoryContent}>
                                <Text style={[styles.advisoryTitle, { color: advisory.color }]}>{advisory.title}</Text>
                                <Text style={styles.advisoryDesc}>{advisory.description}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Weather Alerts */}
                {alerts.length > 0 && (
                    <View style={styles.alertContainer}>
                        <View style={styles.alertHeader}>
                            <Ionicons name="warning" size={24} color="#C62828" />
                            <Text style={styles.alertTitle}>Weather Alert</Text>
                        </View>
                        {alerts.map((alert, index) => (
                            <View key={index} style={styles.alertItem}>
                                <Text style={styles.alertName}>{alert.title}</Text>
                                <Text style={styles.alertTime}>{alert.time}</Text>
                                <Text style={styles.alertDesc}>{alert.description}</Text>
                            </View>
                        ))}
                    </View>
                )}

                <View style={{ height: 30 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#04383f',
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    content: {
        padding: 16,
    },
    locationSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        elevation: 1,
    },
    locationText: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    weatherCard: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        elevation: 2,
    },
    weatherMain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    tempText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#333',
    },
    conditionText: {
        fontSize: 18,
        color: '#666',
        marginTop: 4,
    },
    weatherDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#EEE',
        paddingTop: 16,
    },
    weatherDetailItem: {
        alignItems: 'center',
    },
    detailValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginTop: 4,
    },
    detailLabel: {
        fontSize: 12,
        color: '#999',
    },
    sectionContainer: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    forecastList: {
        flexDirection: 'row',
    },
    forecastItem: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 12,
        borderRadius: 12,
        marginRight: 12,
        width: 70,
        elevation: 1,
    },
    forecastDay: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    forecastTemp: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginTop: 8,
    },
    advisoryCard: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    advisoryIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    advisoryContent: {
        flex: 1,
    },
    advisoryTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    advisoryDesc: {
        fontSize: 13,
        color: '#555',
        lineHeight: 18,
    },
    alertContainer: {
        backgroundColor: '#FFEBEE',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#FFCDD2',
    },
    alertHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    alertTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#C62828',
        marginLeft: 8,
    },
    alertItem: {
        marginBottom: 8,
    },
    alertName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    alertTime: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    alertDesc: {
        fontSize: 14,
        color: '#444',
    },
});

export default WeatherAdvisoryScreen;
