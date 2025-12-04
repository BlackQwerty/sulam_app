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
import { ChevronLeft } from 'lucide-react-native';
import BottomNavBar from '../components/BottomNavBar';

interface PaymentManagementScreenProps {
    onNavigateHome?: () => void;
    onNavigateToProduct?: () => void;
    onNavigateToLocation?: () => void;
    onNavigateToAssistant?: () => void;
    onNavigateToAbout?: () => void;
    onNavigateToPineBot?: () => void;
}

// Mock Data
const financialOverview = {
    balance: 1250.00,
    monthlySpend: 4500.00,
    outstanding: 350.00,
};

const paymentMethods = [
    { id: '1', type: 'Visa', last4: '4242', expiry: '12/26', icon: 'credit-card' },
    { id: '2', type: 'Maybank2u', account: '164...89', icon: 'bank' },
    { id: '3', type: 'Touch \'n Go', phone: '012...789', icon: 'wallet' },
];

const invoices = [
    { id: 'INV-2025-001', date: '03 Dec 2025', amount: 10850, status: 'Paid' },
    { id: 'INV-2024-098', date: '15 Nov 2024', amount: 5400, status: 'Paid' },
    { id: 'INV-2024-085', date: '28 Oct 2024', amount: 2700, status: 'Overdue' },
];

const PaymentManagementScreen = ({
    onNavigateHome,
    onNavigateToProduct,
    onNavigateToLocation,
    onNavigateToAssistant,
    onNavigateToAbout,
    onNavigateToPineBot
}: PaymentManagementScreenProps) => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onNavigateHome} style={styles.backButton}>
                    <ChevronLeft size={32} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Payment Management</Text>
                <TouchableOpacity>
                    <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Financial Overview */}
                <View style={styles.balanceCard}>
                    <Text style={styles.balanceLabel}>Current Balance</Text>
                    <Text style={styles.balanceAmount}>RM {financialOverview.balance.toFixed(2)}</Text>
                    <View style={styles.balanceDetails}>
                        <View>
                            <Text style={styles.detailLabel}>Monthly Spend</Text>
                            <Text style={styles.detailValue}>RM {financialOverview.monthlySpend.toFixed(2)}</Text>
                        </View>
                        <View>
                            <Text style={styles.detailLabel}>Outstanding</Text>
                            <Text style={[styles.detailValue, { color: '#FFEBEE' }]}>RM {financialOverview.outstanding.toFixed(2)}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.topUpButton}>
                        <Text style={styles.topUpText}>Top Up Balance</Text>
                    </TouchableOpacity>
                </View>

                {/* Payment Methods */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Payment Methods</Text>
                        <TouchableOpacity>
                            <Text style={styles.addText}>+ Add New</Text>
                        </TouchableOpacity>
                    </View>
                    {paymentMethods.map((method, index) => (
                        <View key={index} style={styles.methodCard}>
                            <View style={styles.methodIcon}>
                                <MaterialCommunityIcons name={method.icon as any} size={24} color="#04383f" />
                            </View>
                            <View style={styles.methodInfo}>
                                <Text style={styles.methodType}>{method.type}</Text>
                                <Text style={styles.methodDetail}>
                                    {method.last4 ? `•••• ${method.last4}` : method.account || method.phone}
                                </Text>
                            </View>
                            <TouchableOpacity>
                                <Ionicons name="ellipsis-vertical" size={20} color="#999" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                {/* Invoices */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recent Invoices</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    {invoices.map((invoice, index) => (
                        <View key={index} style={styles.invoiceRow}>
                            <View style={styles.invoiceIcon}>
                                <MaterialCommunityIcons name="file-document-outline" size={24} color="#666" />
                            </View>
                            <View style={styles.invoiceInfo}>
                                <Text style={styles.invoiceId}>{invoice.id}</Text>
                                <Text style={styles.invoiceDate}>{invoice.date}</Text>
                            </View>
                            <View style={styles.invoiceRight}>
                                <Text style={styles.invoiceAmount}>RM {invoice.amount}</Text>
                                <Text style={[
                                    styles.invoiceStatus,
                                    { color: invoice.status === 'Paid' ? '#2E7D32' : '#C62828' }
                                ]}>{invoice.status}</Text>
                            </View>
                            <TouchableOpacity style={styles.downloadButton}>
                                <Ionicons name="download-outline" size={20} color="#04383f" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                {/* Quick Actions */}
                <View style={styles.quickActions}>
                    <TouchableOpacity style={styles.actionButton}>
                        <MaterialCommunityIcons name="file-certificate-outline" size={24} color="#04383f" />
                        <Text style={styles.actionText}>Tax Docs</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <MaterialCommunityIcons name="history" size={24} color="#04383f" />
                        <Text style={styles.actionText}>History</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <MaterialCommunityIcons name="message-alert-outline" size={24} color="#04383f" />
                        <Text style={styles.actionText}>Dispute</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 30 }} />
            </ScrollView>

            {/* Bottom Navigation */}
            <BottomNavBar
                currentScreen="home" // Ideally should be 'payment'
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
    balanceCard: {
        backgroundColor: '#00695C',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        elevation: 4,
    },
    balanceLabel: {
        fontSize: 14,
        color: '#E0F2F1',
        marginBottom: 8,
    },
    balanceAmount: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 20,
    },
    balanceDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    detailLabel: {
        fontSize: 12,
        color: '#B2DFDB',
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    topUpButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    topUpText: {
        color: '#00695C',
        fontWeight: '600',
        fontSize: 14,
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
    },
    addText: {
        fontSize: 14,
        color: '#00695C',
        fontWeight: '600',
    },
    seeAllText: {
        fontSize: 14,
        color: '#00695C',
        fontWeight: '500',
    },
    methodCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    methodIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E0F2F1',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    methodInfo: {
        flex: 1,
    },
    methodType: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    methodDetail: {
        fontSize: 14,
        color: '#666',
    },
    invoiceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    invoiceIcon: {
        marginRight: 12,
    },
    invoiceInfo: {
        flex: 1,
    },
    invoiceId: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    invoiceDate: {
        fontSize: 12,
        color: '#999',
    },
    invoiceRight: {
        alignItems: 'flex-end',
        marginRight: 12,
    },
    invoiceAmount: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    invoiceStatus: {
        fontSize: 12,
        fontWeight: '500',
    },
    downloadButton: {
        padding: 4,
    },
    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButton: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginHorizontal: 4,
        elevation: 2,
    },
    actionText: {
        marginTop: 8,
        fontSize: 12,
        color: '#333',
        fontWeight: '500',
    },
});

export default PaymentManagementScreen;
