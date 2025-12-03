import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface FarmerDashboardScreenProps {
    onNavigateHome: () => void;
}

// Mock Data
const metrics = {
    totalSales: 45200,
    unitsSold: 1250,
    avgOrderValue: 185,
    growth: '+12.5%',
};

const salesData = [
    { label: 'Jan', value: 12000 },
    { label: 'Feb', value: 15000 },
    { label: 'Mar', value: 10000 },
    { label: 'Apr', value: 18000 },
    { label: 'May', value: 22000 },
    { label: 'Jun', value: 25000 },
];

const inventory = [
    { name: 'Nenas Dewasa', stock: 87, status: 'Good' },
    { name: 'Anak Pokok', stock: 15, status: 'Low' },
    { name: 'Pess Nanas', stock: 15, status: 'Low' },
    { name: 'Beja Nanas', stock: 15, status: 'Low' },
];

const topProducts = [
    { name: 'Nenas Dewasa', sales: 800, revenue: 24000 },
    { name: 'Beja Nanas', sales: 200, revenue: 17000 },
    { name: 'Anak Pokok', sales: 150, revenue: 4050 },
];

const FarmerDashboardScreen = ({ onNavigateHome }: FarmerDashboardScreenProps) => {
    const [period, setPeriod] = useState('Monthly');

    const renderChart = () => {
        const maxValue = Math.max(...salesData.map(d => d.value));

        return (
            <View style={styles.chartContainer}>
                <View style={styles.chartHeader}>
                    <Text style={styles.sectionTitle}>Revenue Analytics</Text>
                    <TouchableOpacity style={styles.periodButton}>
                        <Text style={styles.periodText}>{period}</Text>
                        <Ionicons name="chevron-down" size={16} color="#666" />
                    </TouchableOpacity>
                </View>
                <View style={styles.barChart}>
                    {salesData.map((data, index) => (
                        <View key={index} style={styles.barColumn}>
                            <View style={styles.barWrapper}>
                                <View
                                    style={[
                                        styles.bar,
                                        { height: (data.value / maxValue) * 150 }
                                    ]}
                                />
                            </View>
                            <Text style={styles.barLabel}>{data.label}</Text>
                        </View>
                    ))}
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onNavigateHome} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Farmer Dashboard</Text>
                <TouchableOpacity>
                    <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Quick Stats */}
                <View style={styles.statsGrid}>
                    <View style={styles.statCard}>
                        <View style={[styles.iconBg, { backgroundColor: '#E0F2F1' }]}>
                            <MaterialCommunityIcons name="currency-myr" size={24} color="#00695C" />
                        </View>
                        <Text style={styles.statValue}>RM {(metrics.totalSales / 1000).toFixed(1)}k</Text>
                        <Text style={styles.statLabel}>Total Sales</Text>
                        <Text style={styles.statGrowth}>{metrics.growth}</Text>
                    </View>
                    <View style={styles.statCard}>
                        <View style={[styles.iconBg, { backgroundColor: '#E3F2FD' }]}>
                            <MaterialCommunityIcons name="package-variant-closed" size={24} color="#1565C0" />
                        </View>
                        <Text style={styles.statValue}>{metrics.unitsSold}</Text>
                        <Text style={styles.statLabel}>Units Sold</Text>
                    </View>
                    <View style={styles.statCard}>
                        <View style={[styles.iconBg, { backgroundColor: '#FFF3E0' }]}>
                            <MaterialCommunityIcons name="cart-outline" size={24} color="#EF6C00" />
                        </View>
                        <Text style={styles.statValue}>RM {metrics.avgOrderValue}</Text>
                        <Text style={styles.statLabel}>Avg. Order</Text>
                    </View>
                    <View style={styles.statCard}>
                        <View style={[styles.iconBg, { backgroundColor: '#F3E5F5' }]}>
                            <MaterialCommunityIcons name="trending-up" size={24} color="#7B1FA2" />
                        </View>
                        <Text style={styles.statValue}>+15</Text>
                        <Text style={styles.statLabel}>New Customers</Text>
                    </View>
                </View>

                {/* Chart */}
                {renderChart()}

                {/* Inventory */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Inventory Overview</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    {inventory.map((item, index) => (
                        <View key={index} style={styles.inventoryRow}>
                            <View>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={[
                                    styles.stockStatus,
                                    { color: item.status === 'Low' ? '#C62828' : '#2E7D32' }
                                ]}>{item.stock} packs left • {item.status}</Text>
                            </View>
                            <TouchableOpacity style={styles.restockButton}>
                                <Text style={styles.restockText}>Restock</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                {/* Top Products */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Top Products</Text>
                    {topProducts.map((product, index) => (
                        <View key={index} style={styles.productRow}>
                            <View style={styles.rankBadge}>
                                <Text style={styles.rankText}>{index + 1}</Text>
                            </View>
                            <View style={styles.productInfo}>
                                <Text style={styles.productName}>{product.name}</Text>
                                <Text style={styles.productSales}>{product.sales} sold</Text>
                            </View>
                            <Text style={styles.productRevenue}>RM {product.revenue}</Text>
                        </View>
                    ))}
                </View>

                {/* Quick Actions */}
                <View style={styles.quickActionsContainer}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.actionGrid}>
                        <TouchableOpacity style={styles.actionCard}>
                            <View style={[styles.actionIcon, { backgroundColor: '#E8F5E9' }]}>
                                <Ionicons name="add-circle-outline" size={28} color="#2E7D32" />
                            </View>
                            <Text style={styles.actionText}>Add Stock</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionCard}>
                            <View style={[styles.actionIcon, { backgroundColor: '#E1F5FE' }]}>
                                <Ionicons name="receipt-outline" size={28} color="#0277BD" />
                            </View>
                            <Text style={styles.actionText}>New Sale</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionCard}>
                            <View style={[styles.actionIcon, { backgroundColor: '#FFFDE7' }]}>
                                <Ionicons name="flag-outline" size={28} color="#FBC02D" />
                            </View>
                            <Text style={styles.actionText}>Set Goals</Text>
                        </TouchableOpacity>
                    </View>
                </View>

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
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    statCard: {
        width: '48%',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
    },
    iconBg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    statValue: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
    },
    statGrowth: {
        position: 'absolute',
        top: 16,
        right: 16,
        fontSize: 12,
        color: '#2E7D32',
        fontWeight: '600',
    },
    chartContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
    },
    chartHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    periodButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EEE',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    periodText: {
        fontSize: 12,
        color: '#666',
        marginRight: 4,
    },
    barChart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 180,
        paddingBottom: 10,
    },
    barColumn: {
        alignItems: 'center',
        width: 30,
    },
    barWrapper: {
        height: 150,
        justifyContent: 'flex-end',
        marginBottom: 8,
    },
    bar: {
        width: 12,
        backgroundColor: '#04383f',
        borderRadius: 6,
    },
    barLabel: {
        fontSize: 12,
        color: '#999',
    },
    sectionContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    seeAllText: {
        fontSize: 14,
        color: '#00695C',
        fontWeight: '500',
    },
    inventoryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    itemName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 4,
    },
    stockStatus: {
        fontSize: 12,
        fontWeight: '500',
    },
    restockButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#E0F2F1',
        borderRadius: 20,
    },
    restockText: {
        fontSize: 12,
        color: '#00695C',
        fontWeight: '600',
    },
    productRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    rankBadge: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#FFD700',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    rankText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#FFF',
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    productSales: {
        fontSize: 12,
        color: '#999',
    },
    productRevenue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#04383f',
    },
    quickActionsContainer: {
        marginBottom: 16,
    },
    actionGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionCard: {
        width: '31%',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        elevation: 2,
    },
    actionIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    actionText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#333',
        textAlign: 'center',
    },
});

export default FarmerDashboardScreen;
