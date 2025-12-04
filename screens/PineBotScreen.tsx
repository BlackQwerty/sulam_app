import React, { useState, useRef, useEffect } from 'react';
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
  Image,
  Keyboard,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ChevronLeft } from 'lucide-react-native';
import BottomNavBar from '../components/BottomNavBar';

interface PineBotScreenProps {
  onNavigateHome?: () => void;
  onNavigateToProduct?: () => void;
  onNavigateToLocation?: () => void;
  onNavigateToAssistant?: () => void;
  onNavigateToAbout?: () => void;
  onNavigateToPineBot?: () => void;
}

type MessageType = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

const PineBotScreen = ({
  onNavigateHome,
  onNavigateToProduct,
  onNavigateToLocation,
  onNavigateToAssistant,
  onNavigateToAbout,
  onNavigateToPineBot
}: PineBotScreenProps) => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: '1',
      text: 'Hello! I\'m Pine-Bot. How can I help you with pineapple farming today?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

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

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Greetings
    if (lowerMessage.match(/(hi|hello|hey|greetings|morning|afternoon|evening)/)) {
      return 'Hello! I\'m here to assist you with anything related to pineapples. Ask me about prices, locations, or how to order!';
    }

    // Subject Recognition (Specific Products)
    if (lowerMessage.match(/(nenas|pineapple|dewasa|fruit)/) && !lowerMessage.match(/(price|cost|stock|locat)/)) {
      return 'For Nenas Dewasa, the price is RM200/pack and we have 87 packs in stock.';
    }
    if (lowerMessage.match(/(anak|pokok|seed|benih)/) && !lowerMessage.match(/(price|cost|stock|locat)/)) {
      return 'For Anak Pokok, the price is RM27/pack and we have 15 packs in stock.';
    }
    if (lowerMessage.match(/(baja|fertilizer|beja)/) && !lowerMessage.match(/(price|cost|stock|locat)/)) {
      return 'For Beja Nanas (Fertilizer), the price is RM85/pack and we have 15 packs in stock.';
    }

    // Intent Recognition with Typo Tolerance
    // Price: price, cost, harga, pay, rm, prce
    if (lowerMessage.match(/(pric|cost|harga|pay|rm|prce|much)/)) {
      return 'Current pineapple prices:\n- Nenas Dewasa: RM200/pack\n- Anak Pokok: RM27/pack\n- Pess Nanas: RM27/pack\n- Beja Nanas: RM85/pack';
    }
    // Stock: stock, stok, avail, left, quantity, stck
    if (lowerMessage.match(/(stock|stok|avail|left|quant|stck)/)) {
      return 'Current stock availability:\n- Nenas Dewasa: 87 packs\n- Anak Pokok: 15 packs\n- Pess Nanas: 15 packs\n- Beja Nanas: 15 packs';
    }
    // Location: location, lokasi, where, place, address, map, locat, lctn
    if (lowerMessage.match(/(locat|lokasi|where|place|addr|map|lctn)/)) {
      return 'Our farm locations:\n1. Alor Gajah (Wanted Pertanian)\n2. Sekinchan (Training/Pelatih)\n3. Air Keruh\n4. Sungai Besi';
    }
    // Contact: contact, hubungi, call, phone, email, number, cntct
    if (lowerMessage.match(/(contact|hubungi|call|phone|email|num|cntct)/)) {
      return 'You can contact:\n- Customer Assistant: +07-236 1211\n- Email: umum@mpib.gov.my\n- Office: Wisma Nanas, Johor Bahru';
    }
    // Help: help, bantuan, support, assist
    if (lowerMessage.match(/(help|bantuan|supp|assist)/)) {
      return 'I can help with:\n- Price information\n- Stock availability\n- Farm locations\n- Contact details\n- Planting guidance\n- Order inquiries';
    }
    // Order: order, pesanan, buy, purchase, get, want, ordr
    if (lowerMessage.match(/(order|pesan|buy|purch|get|want|ordr)/)) {
      return 'To order pineapple products:\n1. Go to "New Sale" section\n2. Select product\n3. Check availability with Pincode\n4. Click "Order Now"';
    }
    // Discount: discount, diskaun, promo, offer, sale
    if (lowerMessage.match(/(disc|diskaun|promo|offer|sale)/)) {
      return 'Current promotion:\n- Nenas Dewasa: 40% discount for bulk purchase\n- Limited time offer!';
    }
    // About: about, tentang, who, what is
    if (lowerMessage.match(/(about|tentang|who|what)/)) {
      return 'Lembaga Perindustrian Nanas Malaysia (LPNM) is a statutory body that develops the pineapple industry in Malaysia through coordination of planting, processing, marketing, and export.';
    }

    // Default responses
    const defaultResponses = [
      'I\'m here to help with pineapple farming queries! Try asking about prices, stock, or locations.',
      'Could you please rephrase your question about pineapple farming?',
      'I specialize in pineapple industry information. Ask me about prices, locations, or how to order!',
      'For detailed assistance, you can also contact our customer assistant at +07-236 1211.',
      'I didn\'t quite catch that. You can ask me things like "How much is the fertilizer?" or "Where is the farm?".'
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
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onNavigateHome}
        >
          <ChevronLeft size={32} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Pine-Bot</Text>

        <View style={styles.robotIconContainer}>
          <MaterialCommunityIcons name="robot" size={28} color="#4DB6AC" />
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // Adjust offset for Android
      >
        {/* Chat Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
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
        <View style={styles.inputWrapper}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Message"
              placeholderTextColor="#999"
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity style={styles.attachButton}>
              <Ionicons name="attach" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="paper-plane-outline" size={28} color="#81D4FA" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Bottom Navigation Bar */}
      <BottomNavBar
        currentScreen="pinebot"
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
    backgroundColor: '#04383f', // Dark Teal Background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#04383f',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#054c54',
    zIndex: 10,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  robotIconContainer: {
    padding: 4,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageContainer: {
    marginBottom: 16,
    width: '100%',
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  botMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: '#00695C', // Darker Teal for User
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: '#26A69A', // Light Teal/Cyan for Bot
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
    color: '#000000',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 12,
    backgroundColor: '#04383f',
  },
  quickButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#80CBC4',
  },
  quickButtonText: {
    color: '#E0F2F1',
    fontSize: 14,
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 20,
    backgroundColor: '#04383f', // Ensure background matches
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
    height: 48,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    maxHeight: 100,
    paddingVertical: 8,
  },
  attachButton: {
    padding: 4,
  },
  sendButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomNav: {
    height: 60,
    backgroundColor: '#065b66', // Slightly lighter teal for footer
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#FFFFFF',
  }
});

export default PineBotScreen;