import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Modal,
    TextInput,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ChevronLeft } from 'lucide-react-native';
import BottomNavBar from '../components/BottomNavBar';
import { getWeatherForLocation, WeatherData, Location } from '../services/WeatherService';

interface WeatherAdvisoryScreenProps {
    onNavigateHome?: () => void;
    onNavigateToProduct?: () => void;
    onNavigateToLocation?: () => void;
    onNavigateToAssistant?: () => void;
    onNavigateToAbout?: () => void;
    onNavigateToPineBot?: () => void;
}

const WeatherAdvisoryScreen = ({
    onNavigateHome,
    onNavigateToProduct,
    onNavigateToLocation,
    onNavigateToAssistant,
    onNavigateToAbout,
    onNavigateToPineBot
}: WeatherAdvisoryScreenProps) => {
    const [locations, setLocations] = useState<Location[]>([
        { id: '1', name: 'Alor Gajah Farm', latitude: 2.3833, longitude: 102.2167 },
        { id: '2', name: 'Sekinchan Farm', latitude: 3.5000, longitude: 101.1000 },
    ]);
    const [selectedLocation, setSelectedLocation] = useState<Location>(locations[0]);
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [newLocationName, setNewLocationName] = useState('');
    const [newLocationLat, setNewLocationLat] = useState('');
    const [newLocationLon, setNewLocationLon] = useState('');
    const [editingLocationId, setEditingLocationId] = useState<string | null>(null);

    useEffect(() => {
        fetchWeather();
    }, [selectedLocation]);

    const fetchWeather = async () => {
        setLoading(true);
        try {
            const data = await getWeatherForLocation(selectedLocation.latitude, selectedLocation.longitude);
            setWeatherData(data);
        } catch (error) {
            console.error('Error fetching weather:', error);
            Alert.alert('Error', 'Failed to fetch weather data');
        } finally {
            setLoading(false);
        }
    };

    const handleAddLocation = () => {
        if (!newLocationName || !newLocationLat || !newLocationLon) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        const lat = parseFloat(newLocationLat);
        const lon = parseFloat(newLocationLon);

        if (isNaN(lat) || isNaN(lon)) {
            Alert.alert('Error', 'Latitude and Longitude must be valid numbers');
            return;
        }

        if (editingLocationId) {
            // Edit existing location
            setLocations(prev => prev.map(loc =>
                loc.id === editingLocationId
                    ? { ...loc, name: newLocationName, latitude: lat, longitude: lon }
                    : loc
            ));
            // If currently selected location was edited, update it
            if (selectedLocation.id === editingLocationId) {
                setSelectedLocation({ id: editingLocationId, name: newLocationName, latitude: lat, longitude: lon });
            }
        } else {
            // Add new location
            const newLocation: Location = {
                id: Date.now().toString(),
                name: newLocationName,
                latitude: lat,
                longitude: lon,
            };
            setLocations(prev => [...prev, newLocation]);
            setSelectedLocation(newLocation);
        }

        closeModal();
    };

    const handleEditLocation = (location: Location) => {
        setNewLocationName(location.name);
        setNewLocationLat(location.latitude.toString());
        setNewLocationLon(location.longitude.toString());
        setEditingLocationId(location.id);
        setModalVisible(true);
    };

    const handleDeleteLocation = (id: string) => {
        if (locations.length <= 1) {
            Alert.alert('Error', 'You must have at least one location');
            return;
        }

        Alert.alert(
            'Delete Location',
            'Are you sure you want to delete this location?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        const newLocations = locations.filter(loc => loc.id !== id);
                        setLocations(newLocations);
                        if (selectedLocation.id === id) {
                            setSelectedLocation(newLocations[0]);
                        }
                    }
                }
            ]
        );
    };

    const openAddModal = () => {
        setNewLocationName('');
        setNewLocationLat('');
        setNewLocationLon('');
        setEditingLocationId(null);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setNewLocationName('');
        setNewLocationLat('');
        setNewLocationLon('');
        setEditingLocationId(null);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onNavigateHome} style={styles.backButton}>
                    <ChevronLeft size={32} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Weather Advisory</Text>
                <TouchableOpacity onPress={openAddModal}>
                    <Ionicons name="add-circle-outline" size={28} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Location Selector */}
                <View style={styles.locationContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.locationScroll}>
                        {locations.map(loc => (
                            <TouchableOpacity
                                key={loc.id}
                                style={[
                                    styles.locationChip,
                                    selectedLocation.id === loc.id && styles.selectedLocationChip
                                ]}
                                onPress={() => setSelectedLocation(loc)}
                                onLongPress={() => handleEditLocation(loc)}
                            >
                                <Text style={[
                                    styles.locationChipText,
                                    selectedLocation.id === loc.id && styles.selectedLocationChipText
                                ]}>{loc.name}</Text>
                                {selectedLocation.id === loc.id && (
                                    <TouchableOpacity onPress={() => handleDeleteLocation(loc.id)} style={styles.deleteIcon}>
                                        <Ionicons name="close-circle" size={16} color="#FFF" />
                                    </TouchableOpacity>
                                )}
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#04383f" />
                        <Text style={styles.loadingText}>Fetching weather data...</Text>
                    </View>
                ) : weatherData ? (
                    <>
                        {/* Current Weather Card */}
                        <View style={styles.weatherCard}>
                            <View style={styles.weatherMain}>
                                <View>
                                    <Text style={styles.tempText}>{weatherData.current.temp}°C</Text>
                                    <Text style={styles.conditionText}>{weatherData.current.condition}</Text>
                                </View>
                                <MaterialCommunityIcons name={weatherData.current.condition.includes('Rain') ? 'weather-rainy' : weatherData.current.condition.includes('Cloud') ? 'weather-partly-cloudy' : 'weather-sunny'} size={80} color="#FFB74D" />
                            </View>
                            <View style={styles.weatherDetails}>
                                <View style={styles.weatherDetailItem}>
                                    <MaterialCommunityIcons name="water-percent" size={20} color="#666" />
                                    <Text style={styles.detailValue}>{weatherData.current.humidity}%</Text>
                                    <Text style={styles.detailLabel}>Humidity</Text>
                                </View>
                                <View style={styles.weatherDetailItem}>
                                    <MaterialCommunityIcons name="weather-windy" size={20} color="#666" />
                                    <Text style={styles.detailValue}>{weatherData.current.windSpeed} km/h</Text>
                                    <Text style={styles.detailLabel}>Wind</Text>
                                </View>
                                <View style={styles.weatherDetailItem}>
                                    <MaterialCommunityIcons name="weather-rainy" size={20} color="#666" />
                                    <Text style={styles.detailValue}>{weatherData.current.rainfall} mm</Text>
                                    <Text style={styles.detailLabel}>Rainfall</Text>
                                </View>
                            </View>
                        </View>

                        {/* 7-Day Forecast */}
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>7-Day Forecast</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.forecastList}>
                                {weatherData.forecast.map((day, index) => (
                                    <View key={index} style={styles.forecastItem}>
                                        <Text style={styles.forecastDay}>{day.day}</Text>
                                        <MaterialCommunityIcons name={day.icon as any} size={28} color="#555" />
                                        <Text style={styles.forecastTemp}>{day.temp}°</Text>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    </>
                ) : (
                    <Text style={styles.errorText}>No weather data available</Text>
                )}

                <View style={{ height: 30 }} />
            </ScrollView>

            {/* Add/Edit Location Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{editingLocationId ? 'Edit Location' : 'Add New Location'}</Text>

                        <Text style={styles.inputLabel}>Location Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. My Farm"
                            value={newLocationName}
                            onChangeText={setNewLocationName}
                        />

                        <Text style={styles.inputLabel}>Latitude</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. 2.3833"
                            value={newLocationLat}
                            onChangeText={setNewLocationLat}
                            keyboardType="numeric"
                        />

                        <Text style={styles.inputLabel}>Longitude</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. 102.2167"
                            value={newLocationLon}
                            onChangeText={setNewLocationLon}
                            keyboardType="numeric"
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={closeModal}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={handleAddLocation}>
                                <Text style={styles.saveButtonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Bottom Navigation */}
            <BottomNavBar
                currentScreen="home" // Ideally should be 'weather' but BottomNavBar might not support it yet. I'll check BottomNavBar props.
                onNavigateHome={onNavigateHome || (() => { })}
                onNavigateToProduct={onNavigateToProduct || (() => { })}
                onNavigateToLocation={onNavigateToLocation || (() => { })}
                onNavigateToAssistant={onNavigateToAssistant || (() => { })}
                onNavigateToAbout={onNavigateToAbout || (() => { })}
                onNavigateToPineBot={onNavigateToPineBot || (() => { })}
            />
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
    locationContainer: {
        marginBottom: 16,
    },
    locationScroll: {
        flexDirection: 'row',
    },
    locationChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#DDD',
    },
    selectedLocationChip: {
        backgroundColor: '#04383f',
        borderColor: '#04383f',
    },
    locationChipText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    selectedLocationChipText: {
        color: '#FFF',
    },
    deleteIcon: {
        marginLeft: 8,
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
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    loadingText: {
        marginTop: 10,
        color: '#666',
    },
    errorText: {
        textAlign: 'center',
        color: 'red',
        marginTop: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 20,
        width: '80%',
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#04383f',
    },
    inputLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        padding: 10,
        marginBottom: 16,
        fontSize: 16,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    modalButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#DDD',
    },
    saveButton: {
        backgroundColor: '#04383f',
    },
    cancelButtonText: {
        color: '#333',
        fontWeight: '600',
    },
    saveButtonText: {
        color: '#FFF',
        fontWeight: '600',
    },
});

export default WeatherAdvisoryScreen;
