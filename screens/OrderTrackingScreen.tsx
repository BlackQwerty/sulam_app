import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Image,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ChevronLeft } from 'lucide-react-native';
import BottomNavBar from '../components/BottomNavBar';

interface OrderTrackingScreenProps {
    onNavigateHome?: () => void;
    onNavigateToProduct?: () => void;
    onNavigateToLocation?: () => void;
    onNavigateToAssistant?: () => void;
    onNavigateToAbout?: () => void;
    onNavigateToPineBot?: () => void;
}

// Mock Data
const currentOrder = {
    id: 'ORD-2025-001',
    date: '2025-12-03',
    status: 'Shipped', // Pending, Processing, Shipped, Delivered, Cancelled
    items: [
        { name: 'Nenas Dewasa', quantity: 50, price: 200 },
        { name: 'Beja Nanas', quantity: 10, price: 85 },
    ],
    total: 10850,
    deliveryAddress: 'Lot 123, Jalan Pineapple, 81200 Johor Bahru, Johor',
    estimatedDelivery: '2025-12-06',
    shipper: 'J&T Express',
    trackingNumber: 'MY123456789',
};

const orderHistory = [
    { id: 'ORD-2024-098', date: '2024-11-15', total: 5400, status: 'Delivered' },
    { id: 'ORD-2024-085', date: '2024-10-28', total: 2700, status: 'Delivered' },
    { id: 'ORD-2024-072', date: '2024-10-05', total: 8500, status: 'Cancelled' },
];

const OrderTrackingScreen = ({
    onNavigateHome,
    onNavigateToProduct,
    onNavigateToLocation,
    onNavigateToAssistant,
    onNavigateToAbout,
    onNavigateToPineBot
}: OrderTrackingScreenProps) => {
    const [activeTab, setActiveTab] = useState<'current' | 'history'>('current');

    const renderTimeline = () => {
        const steps = ['Pending', 'Processing', 'Shipped', 'Delivered'];
        const currentStepIndex = steps.indexOf(currentOrder.status);

        return (
            <View style={styles.timelineContainer}>
                {steps.map((step, index) => (
                    <View key={step} style={styles.timelineStep}>
                        <View style={[
                            styles.timelineDot,
                            index <= currentStepIndex && styles.timelineDotActive
                        ]}>
                            {index <= currentStepIndex && (
                                <Ionicons name="checkmark" size={12} color="#FFF" />
                            )}
                        </View>
                        <Text style={[
                            styles.timelineLabel,
                            index <= currentStepIndex && styles.timelineLabelActive
                        ]}>{step}</Text>
                        {index < steps.length - 1 && (
                            <View style={[
                                styles.timelineLine,
                                index < currentStepIndex && styles.timelineLineActive
                            ]} />
                        )}
                    </View>
                ))}
            </View>
        );
    };

    const renderCurrentOrder = () => (
        <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
            {/* Status Card */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>Order Status</Text>
                    <View style={[styles.statusBadge, { backgroundColor: '#E0F2F1' }]}>
                        <Text style={[styles.statusText, { color: '#00695C' }]}>{currentOrder.status}</Text>
                    </View>
                </View>
                {renderTimeline()}
                <Text style={styles.estimatedText}>
                    Estimated Delivery: <Text style={styles.boldText}>{currentOrder.estimatedDelivery}</Text>
                </Text>
            </View>

            {/* Order Details */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Order Details</Text>
                <Text style={styles.orderId}>Order ID: {currentOrder.id}</Text>
                <Text style={styles.orderDate}>Date: {currentOrder.date}</Text>

                <View style={styles.divider} />

                {currentOrder.items.map((item, index) => (
                    <View key={index} style={styles.itemRow}>
                        <Text style={styles.itemName}>{item.quantity}x {item.name}</Text>
                        <Text style={styles.itemPrice}>RM {item.price * item.quantity}</Text>
                    </View>
                ))}

                <View style={styles.divider} />

                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total Amount</Text>
                    <Text style={styles.totalAmount}>RM {currentOrder.total}</Text>
                </View>
            </View>

            {/* Delivery Info */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Delivery Information</Text>
                <View style={styles.infoRow}>
                    <Ionicons name="location-outline" size={20} color="#666" />
                    <Text style={styles.infoText}>{currentOrder.deliveryAddress}</Text>
                </View>
                <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="truck-delivery-outline" size={20} color="#666" />
                    <Text style={styles.infoText}>{currentOrder.shipper} - {currentOrder.trackingNumber}</Text>
                </View>

                <TouchableOpacity style={styles.contactButton}>
                    <Ionicons name="call-outline" size={20} color="#FFF" />
                    <Text style={styles.contactButtonText}>Contact Shipper</Text>
                </TouchableOpacity>
            </View>

            {/* Actions */}
            <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionButtonOutline}>
                    <Text style={styles.actionButtonOutlineText}>Report Problem</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButtonFilled}>
                    <Text style={styles.actionButtonFilledText}>Download Invoice</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );

    const renderHistory = () => (
        <FlatList
            data={orderHistory}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.historyList}
            renderItem={({ item }) => (
                <View style={styles.historyCard}>
                    <View style={styles.historyHeader}>
                        <Text style={styles.historyId}>{item.id}</Text>
                        <Text style={styles.historyDate}>{item.date}</Text>
                    </View>
                    <View style={styles.historyDetails}>
                        <Text style={styles.historyTotal}>RM {item.total}</Text>
                        <Text style={[
                            styles.historyStatus,
                            { color: item.status === 'Delivered' ? '#2E7D32' : '#C62828' }
                        ]}>{item.status}</Text>
                    </View>
                    <TouchableOpacity style={styles.reorderButton}>
                        <Text style={styles.reorderText}>Reorder</Text>
                    </TouchableOpacity>
                </View>
            )}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onNavigateHome} style={styles.backButton}>
                    <ChevronLeft size={32} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Orders</Text>
                <View style={{ width: 28 }} />
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'current' && styles.activeTab]}
                    onPress={() => setActiveTab('current')}
                >
                    <Text style={[styles.tabText, activeTab === 'current' && styles.activeTabText]}>Current Order</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'history' && styles.activeTab]}
                    onPress={() => setActiveTab('history')}
                >
                    <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>Order History</Text>
                </TouchableOpacity>
            </View>

            {activeTab === 'current' ? renderCurrentOrder() : renderHistory()}

            {/* Bottom Navigation */}
            <BottomNavBar
                currentScreen="home" // Ideally should be 'orders'
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
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 4,
        margin: 16,
        borderRadius: 8,
        elevation: 2,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 6,
    },
    activeTab: {
        backgroundColor: '#04383f',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666',
    },
    activeTabText: {
        color: '#FFFFFF',
    },
    contentContainer: {
        padding: 16,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    timelineContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 16,
        paddingHorizontal: 8,
    },
    timelineStep: {
        alignItems: 'center',
        width: 70,
    },
    timelineDot: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        zIndex: 1,
    },
    timelineDotActive: {
        backgroundColor: '#00695C',
    },
    timelineLine: {
        position: 'absolute',
        top: 9,
        left: 45, // Adjust based on width
        width: 50, // Adjust based on spacing
        height: 2,
        backgroundColor: '#E0E0E0',
        zIndex: 0,
    },
    timelineLineActive: {
        backgroundColor: '#00695C',
    },
    timelineLabel: {
        fontSize: 10,
        color: '#999',
        textAlign: 'center',
    },
    timelineLabelActive: {
        color: '#00695C',
        fontWeight: '600',
    },
    estimatedText: {
        marginTop: 12,
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    boldText: {
        fontWeight: '600',
        color: '#333',
    },
    orderId: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    orderDate: {
        fontSize: 14,
        color: '#999',
        marginBottom: 12,
    },
    divider: {
        height: 1,
        backgroundColor: '#EEE',
        marginVertical: 12,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    itemName: {
        fontSize: 14,
        color: '#333',
    },
    itemPrice: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: '700',
        color: '#04383f',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    infoText: {
        marginLeft: 12,
        fontSize: 14,
        color: '#444',
        flex: 1,
    },
    contactButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00695C',
        padding: 12,
        borderRadius: 8,
        marginTop: 8,
    },
    contactButtonText: {
        color: '#FFF',
        fontWeight: '600',
        marginLeft: 8,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    actionButtonOutline: {
        flex: 1,
        marginRight: 8,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#C62828',
        alignItems: 'center',
    },
    actionButtonOutlineText: {
        color: '#C62828',
        fontWeight: '600',
    },
    actionButtonFilled: {
        flex: 1,
        marginLeft: 8,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#04383f',
        alignItems: 'center',
    },
    actionButtonFilledText: {
        color: '#FFF',
        fontWeight: '600',
    },
    historyList: {
        padding: 16,
    },
    historyCard: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        elevation: 1,
    },
    historyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    historyId: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    historyDate: {
        fontSize: 14,
        color: '#999',
    },
    historyDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    historyTotal: {
        fontSize: 16,
        fontWeight: '700',
        color: '#04383f',
    },
    historyStatus: {
        fontSize: 14,
        fontWeight: '500',
    },
    reorderButton: {
        alignItems: 'center',
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
    },
    reorderText: {
        color: '#00695C',
        fontWeight: '600',
    },
});

export default OrderTrackingScreen;
