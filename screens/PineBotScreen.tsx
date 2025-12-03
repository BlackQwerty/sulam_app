import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PineBotScreenProps {
  onNavigateHome?: () => void;
}

type MessageType = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

const PineBotScreen = ({ onNavigateHome }: PineBotScreenProps) => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: '1',
      text: 'Hello! I\'m Pine-Bot. How can I help you with pineapple farming today?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim() === '') return;

    // Add user message
    const userMessage: MessageType = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate bot response after delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputText);
      const botMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Pineapple farming responses
    if (lowerMessage.includes('price') || lowerMessage.includes('harga')) {
      return 'Current pineapple prices:\n- Nenas Dewasa: RM200/pack\n- Anak Pokok: RM27/pack\n- Pess Nanas: RM27/pack\n- Beja Nanas: RM85/pack';
    }
    if (lowerMessage.includes('stock') || lowerMessage.includes('stok')) {
      return 'Current stock availability:\n- Nenas Dewasa: 87 packs\n- Anak Pokok: 15 packs\n- Pess Nanas: 15 packs\n- Beja Nanas: 15 packs';
    }
    if (lowerMessage.includes('location') || lowerMessage.includes('lokasi')) {
      return 'Our farm locations:\n1. Alor Gajah (Wanted Pertanian)\n2. Sekinchan (Training/Pelatih)\n3. Air Keruh\n4. Sungai Besi';
    }
    if (lowerMessage.includes('contact') || lowerMessage.includes('hubungi')) {
      return 'You can contact:\n- Customer Assistant: +07-236 1211\n- Email: umum@mpib.gov.my\n- Office: Wisma Nanas, Johor Bahru';
    }
    if (lowerMessage.includes('help') || lowerMessage.includes('bantuan')) {
      return 'I can help with:\n- Price information\n- Stock availability\n- Farm locations\n- Contact details\n- Planting guidance\n- Order inquiries';
    }
    if (lowerMessage.includes('order') || lowerMessage.includes('pesanan')) {
      return 'To order pineapple products:\n1. Go to "New Sale" section\n2. Select product\n3. Check availability with Pincode\n4. Click "Order Now"';
    }
    if (lowerMessage.includes('discount') || lowerMessage.includes('diskaun')) {
      return 'Current promotion:\n- Nenas Dewasa: 40% discount for bulk purchase\n- Limited time offer!';
    }
    if (lowerMessage.includes('about') || lowerMessage.includes('tentang')) {
      return 'Lembaga Perindustrian Nanas Malaysia (LPNM) is a statutory body that develops the pineapple industry in Malaysia through coordination of planting, processing, marketing, and export.';
    }

    // Default responses
    const defaultResponses = [
      'I\'m here to help with pineapple farming queries! Try asking about prices, stock, or locations.',
      'Could you please rephrase your question about pineapple farming?',
      'I specialize in pineapple industry information. Ask me about prices, locations, or how to order!',
      'For detailed assistance, you can also contact our customer assistant at +07-236 1211.',
    ];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const renderMessage = ({ item }: { item: MessageType }) => (
    <View style={[
      styles.messageContainer,
      item.isUser ? styles.userMessage : styles.botMessage
    ]}>
      <View style={[
        styles.messageBubble,
        item.isUser ? styles.userBubble : styles.botBubble
      ]}>
        <Text style={[
          styles.messageText,
          item.isUser ? styles.userText : styles.botText
        ]}>
          {item.text}
        </Text>
        <Text style={styles.timestamp}>
          {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        {onNavigateHome && (
          <TouchableOpacity 
            style={styles.backButton}
            onPress={onNavigateHome}
          >
            <Ionicons name="arrow-back" size={24} color="#2E7D32" />
          </TouchableOpacity>
        )}
        
        <View style={styles.headerContent}>
          <Ionicons name="chatbubble-ellipses" size={24} color="#2E7D32" />
          <Text style={styles.headerTitle}>Pine-Bot</Text>
        </View>
        
        <View style={styles.emptySpace} />
      </View>

      {/* Chat Messages */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
        inverted={false}
        showsVerticalScrollIndicator={false}
      />

      {/* Quick Action Buttons */}
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.quickButton}
          onPress={() => setInputText('What are the prices?')}
        >
          <Text style={styles.quickButtonText}>Prices</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.quickButton}
          onPress={() => setInputText('Where are the farm locations?')}
        >
          <Text style={styles.quickButtonText}>Locations</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.quickButton}
          onPress={() => setInputText('How to order?')}
        >
          <Text style={styles.quickButtonText}>Order</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.quickButton}
          onPress={() => setInputText('Contact information')}
        >
          <Text style={styles.quickButtonText}>Contact</Text>
        </TouchableOpacity>
      </View>

      {/* Input Area */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={inputText}
          onChangeText={setInputText}
          multiline
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Ionicons name="send" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    padding: 4,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 12,
    color: '#2E7D32',
  },
  emptySpace: {
    width: 32, // Same width as back button for balance
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  botMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userBubble: {
    backgroundColor: '#2E7D32',
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: '#FFFFFF',
  },
  botText: {
    color: '#333333',
  },
  timestamp: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  quickButton: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  quickButtonText: {
    color: '#2E7D32',
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    fontSize: 16,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  sendButton: {
    backgroundColor: '#2E7D32',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
});

export default PineBotScreen;