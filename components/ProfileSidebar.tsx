import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, Dimensions, Modal, TouchableWithoutFeedback } from 'react-native';
import { UserCircle, HelpCircle, LogOut } from 'lucide-react-native';

interface ProfileSidebarProps {
  isVisible: boolean;
  onClose: () => void;
  onLogout?: () => void;
}

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.75;

export default function ProfileSidebar({ isVisible, onClose, onLogout }: ProfileSidebarProps) {
  const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -SIDEBAR_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Optional: callback after close animation
      });
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <Modal transparent visible={isVisible} animationType="none">
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            styles.sidebar,
            { transform: [{ translateX: slideAnim }] }
          ]}
        >
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcHJvZmlsZXxlbnwwfDB8fHwxNzY0Nzg4NDExfDA&ixlib=rb-4.1.0&q=85' }}
                style={styles.avatar}
              />
            </View>
            <Text style={styles.username}>NizarKacak</Text>

            <View style={styles.roleContainer}>
              <Text style={styles.viewProfileText}>View profile</Text>
              <View style={styles.roleBadge}>
                <Text style={styles.roleText}>Farmer</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <UserCircle size={28} color="#fff" />
              </View>
              <Text style={styles.menuText}>Edit profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <HelpCircle size={28} color="#fff" />
              </View>
              <Text style={styles.menuText}>Help</Text>
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <View style={styles.logoutContainer}>
            <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
              <LogOut size={20} color="#fff" style={styles.logoutIcon} />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
  },
  backdrop: {
    flex: 1,
  },
  sidebar: {
    width: SIDEBAR_WIDTH,
    height: '100%',
    backgroundColor: '#006884',
    paddingTop: 60,
    paddingHorizontal: 20,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#fff',
    overflow: 'hidden',
    marginBottom: 10,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  username: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  viewProfileText: {
    color: '#fff',
    fontSize: 14,
  },
  roleBadge: {
    backgroundColor: '#386bff',
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  roleText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginBottom: 30,
  },
  menuContainer: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  menuIconContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: 15,
  },
  menuText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  logoutContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#386bff',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
