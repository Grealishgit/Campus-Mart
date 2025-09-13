import { AntDesign } from '@expo/vector-icons';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react'
import { data } from '../data/data';
import { Ionicons } from '@expo/vector-icons';

const ProductCard = () => {
    const [liked, setLiked] = React.useState({});

    const toggleLike = (id) => {
        setLiked(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <View style={styles.container}>
            <ScrollView vertical showsVerticalScrollIndicator={false}>
                <View style={styles.productContainer}>
                    {data.map((product) => (
                        <View key={product.id} style={styles.productCard}>
                            <TouchableOpacity
                                style={styles.likeButton}
                                onPress={() => toggleLike(product.id)}
                            >
                                <Ionicons
                                    name={liked[product.id] ? 'heart' : 'heart-outline'}
                                    size={18}
                                    color={liked[product.id] ? 'red' : 'gray'}
                                />
                            </TouchableOpacity>
                            <Image source={{ uri: product.image }} style={styles.productImage} />
                            <View style={styles.productInfo}>
                                <View style={styles.productTitle}>
                                    <Text style={styles.title}>{(product.title.length > 20 ?
                                        product.title.substring(0, 8) + '...' : product.title
                                    )}</Text>
                                    <Text style={styles.price}>{product.price} {product.priceValue}</Text>
                                </View>

                                <Text style={styles.category}>Category: {product.category}</Text>
                                <Text style={styles.seller}>Seller: {product.seller} ({product.sellerRating}⭐)</Text>
                                <Text style={styles.posted}>Posted: {product.postedDate}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

export default ProductCard
const styles = StyleSheet.create({
    likeButton: {
        position: 'absolute',
        top: 5,
        right: 15,
        zIndex: 1,
        width: 30,
        height: 30,
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15,
        flex: 1,
        flexWrap: 'wrap',
    },
    price: {
        color: '#155dfc',
        fontWeight: 'bold',
        marginBottom: 2,
    },
    category: {
        fontSize: 12,
        color: '#555',
        marginBottom: 2,
    },
    seller: {
        fontSize: 12,
        color: '#555',
        marginBottom: 2,
    },
    posted: {
        fontSize: 11,
        color: '#888',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    productContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        width: 350,
    },
    productCard: {
        width: 160,
        position: 'relative',
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: '#f9fafb',
    },
    productImage: {
        width: '100%',
        height: 100,
        resizeMode: 'cover',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginBottom: 5
    },
    productInfo: {
        padding: 10
    },
    productTitle: {
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    // ...existing code...
})
