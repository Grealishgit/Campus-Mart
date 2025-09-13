import { View, Text, TextInput, StyleSheet, Touchable, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Feather, Ionicons } from '@expo/vector-icons'
import { data } from '../data/data';

const SearchContainer = (props) => {

    // Get unique categories and sort alphabetically
    const categories = Array.from(new Set(data.map(item => item.category)));
    categories.sort((a, b) => a.localeCompare(b));
    const allCategories = ['All', ...categories];

    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Notify parent of category or search changes
    useEffect(() => {
        if (typeof props?.onCategoryChange === 'function') {
            props.onCategoryChange(activeCategory, searchQuery);
        }
    }, [activeCategory, searchQuery]);

    // Allow parent to receive selected category

    useEffect(() => {
        if (typeof props?.onCategoryChange === 'function') {
            props.onCategoryChange(activeCategory);
        }
    }, [activeCategory]);

    return (
        <View style={styles.container}>
            <View>
                <TextInput
                    placeholder='Search products...'
                    style={styles.inputContainer}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <Ionicons name="search" size={22} color="gray" style={styles.searchIcon} />
                <Feather name="filter" size={20} color="gray" style={styles.searchIcon1} />
            </View>
            <ScrollView horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 10, paddingHorizontal: 15 }}
            >
                <View style={styles.categoryContainer}>
                    {allCategories.map((category, idx) => (
                        <View key={category}>
                            <TouchableOpacity
                                style={[styles.cataegoryButton, activeCategory === category && { backgroundColor: '#155dfc' }]}
                                onPress={() => setActiveCategory(category)}
                            >
                                <Text style={activeCategory === category ? { color: 'white', fontWeight: 'bold' } : {}}>{category}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>

    )
}

export default SearchContainer

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 10
    },
    inputContainer: {
        borderColor: 'lightgray',
        placeholderTextColor: 'gray',
        placeholderTextWeight: 'bold',
        borderRadius: 25,
        padding: 12,
        paddingLeft: 40,
        width: 350,
        marginBottom: 10,
        backgroundColor: '#f9fafb',
        fontSize: 16,
        borderWidth: 1,
        borderActiveColor: '#007AFF',
    },
    searchIcon: {
        position: 'absolute',
        left: 15,
        top: 13
    },
    searchIcon1: {
        position: 'absolute',
        right: 15,
        top: 14
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%',
        marginBottom: 10
    },
    cataegoryButton: {
        borderRadius: 20,
        backgroundColor: '#f3f4f6',
        borderColor: '#155dfc',
        borderWidth: 1,
        padding: 8,
        paddingHorizontal: 15,
        marginRight: 10,
        minWidth: 70,
        alignItems: 'center',
        justifyContent: 'center',
    }
})