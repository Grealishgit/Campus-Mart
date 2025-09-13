import { AntDesign, Feather } from '@expo/vector-icons';
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
                            {/* Image */}
                            <Image source={{ uri: product.image }} style={styles.productImage} />


                            <View style={styles.productInfo}>
                                <View style={styles.productTitle}>
                                    <Text style={styles.title}>{(product.title.length > 20 ?
                                        product.title.substring(0, 8) + '...' : product.title
                                    )}</Text>
                                    <Text style={styles.price}>{product.price} {product.priceValue}</Text>
                                </View>
                                <View style={styles.productTitle}>
                                    <Text style={styles.seller}>{(product.seller.length > 10 ?
                                        product.seller.substring(0, 5) + '' : product.seller
                                    )} ● {product.location} </Text>
                                </View>

                                <View style={styles.productTitle}>
                                    <Text style={styles.category}>{product.category}</Text>
                                    <Text style={styles.seller}> ({product.sellerRating}⭐)</Text>
                                </View>

                                <Text style={styles.posted}>Posted: {product.postedDate}</Text>
                            </View>

                            <TouchableOpacity style={styles.messageButton}>
                                <Feather name="message-circle" size={16} color="white" style={{ marginRight: 5 }} />
                                <Text style={styles.messageText}>Message Seller</Text>
                            </TouchableOpacity>
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
        right: 7,
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
        fontSize: 20,
        marginBottom: 2,
    },
    category: {
        borderRadius: 25,
        paddingHorizontal: 6,
        paddingVertical: 2,
        fontSize: 12,
        backgroundColor: '#c8cbd0',
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
        height: 120,
        resizeMode: 'cover',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginBottom: 5
    },
    productInfo: {
        paddingLeft: 10
    },
    productTitle: {
        flexDirection: 'row',
        marginLeft: 5,
        marginRight: 5,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    messageButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '90%',
        marginLeft: '5%',
        backgroundColor: '#155dfc',
        padding: 8,
        borderRadius: 5,
        alignItems: 'center',
        margin: 10,
    },
    messageText: {
        color: 'white',
        fontWeight: 'bold'
    }
    // ...existing code...
})
