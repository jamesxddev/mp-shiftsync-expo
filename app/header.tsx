import { Image, StyleSheet } from 'react-native';
import React from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';

interface HeaderProps {
    children: React.ReactNode;
  }

const Header = ({ children }: HeaderProps) => {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image
                    source={require('@/assets/images/mp-header-logo.jpg')}
                    style={styles.headerLogo}
                />
            }>
            {children}

        </ParallaxScrollView>

    );
};

export default Header;

const styles = StyleSheet.create({
  headerLogo: {
    height: 200,
    width: 430,
    bottom: 0,
    left: 0,
    position: 'absolute',
  }
});