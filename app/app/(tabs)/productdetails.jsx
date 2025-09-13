import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import SafeScreen from '@/components/SafeScreen';
import { Ionicons, Octicons } from '@expo/vector-icons';

const ProductDetails = () => {
    // Function to map rating to Ionicons stars
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;
        let stars = [];
        for (let i = 0; i < fullStars; i++) stars.push(
            <Ionicons key={`full-${i}`} name='star' color='#f5b700' size={20} />
        );
        if (halfStar) stars.push(
            <Ionicons key='half' name='star-half' color='#f5b700' size={20} />
        );
        for (let i = 0; i < emptyStars; i++) stars.push(
            <Ionicons key={`empty-${i}`} name='star-outline' color='#f5b700' size={20} />
        );
        return stars;
    };
    const { product } = useLocalSearchParams();
    let productObj = null;
    try {
        productObj = product ? JSON.parse(product) : null;
    } catch {
        productObj = null;
    }
    const [mainImage, setMainImage] = React.useState(productObj?.image);
    React.useEffect(() => {
        setMainImage(productObj?.image);
    }, [productObj?.image]);
    if (!productObj) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>No product found.</Text>
        </View>
    );

    return (
        <SafeScreen>
            <View style={styles.container}>
                <Image source={{ uri: mainImage }} style={styles.image} />
                <View style={styles.glassWrapper}>
                    <ScrollView contentContainerStyle={styles.infoSection}>
                        <Text style={styles.title}>{productObj.title}</Text>

                        {/* Images */}
                        <View style={styles.imageContainer}>
                            {productObj.images && productObj.images.map((img, idx) => (
                                <TouchableOpacity key={idx} onPress={() => setMainImage(img)}>
                                    <Image source={{ uri: img }} style={styles.images} />
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.chipRowMain}>
                            <View style={styles.chipRow}>
                                <Text style={styles.chip}>{productObj.category}</Text>
                                <Text style={styles.chip}>{productObj.condition}</Text>
                                <Text style={styles.chip}>{(productObj.isFavorite ? 'Unliked' : 'Liked')}</Text>
                            </View>
                            <View>
                                <Text style={styles.price}>{productObj.price} {productObj.priceValue}</Text>
                            </View>
                        </View>

                        <View style={styles.sellerContainer}>
                            <View style={styles.sellerView}>
                                <Text style={styles.sellerText}> Seller:  {productObj.seller}</Text>
                                <Octicons name='verified' color='#155dfc' size={15} />
                            </View>

                            <View style={styles.stars}>
                                {renderStars(productObj.sellerRating)}
                                <Text style={styles.ratingText}>({productObj.sellerRating})</Text>
                            </View>

                        </View>

                        <View style={styles.sellerContainer}>
                            <Text style={styles.chip}>
                                Location: <Text style={{ fontWeight: 'bold' }}>
                                    {productObj.location}
                                </Text>
                            </Text>
                            <Text style={styles.chip}>Quantity: {productObj.quantity}</Text>
                            <View style={styles.reviews}>
                                <View style={styles.sellerReviews}>
                                    <Text style={styles.reviewText}>
                                        {productObj.sellerReviews}
                                    </Text>
                                </View>
                                <Text style={styles.reviewText}>Reviews</Text>
                            </View>
                        </View>
                        <View style={styles.separator}></View>

                        <Text style={styles.description}>{productObj.description}</Text>

                        <Text style={styles.posted}>Posted: {productObj.postedDate}</Text>

                        <View style={styles.buttons}>
                            <TouchableOpacity style={styles.addFavoriteButton}>
                                <Text style={styles.buttonText}>
                                    Add to Favorite
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.messageButton}>
                                <Text style={styles.buttonText1}>
                                    Message Seller    
                                </Text>

                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>

            </View>
        </SafeScreen>
    );
};

export default ProductDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        width: '100%',
        height: '50%',
        resizeMode: 'cover',
        borderRadius: 24,
        elevation: 8,
    },
    images: {
        width: 100,
        height: 80,
        resizeMode: 'cover',
        borderRadius: 8,
        elevation: 8,
    },
    imageContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
        marginBottom: 5,
        justifyContent: 'center'
    },
    glassWrapper: {
        position: 'absolute',
        top: '45%',
        left: 0,
        width: '100%',
        height: '55%',
        paddingTop: -4,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    infoSection: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.25)',
        borderRadius: 25,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.35)',
    },
    title: {
        marginTop: -20,
        fontWeight: 'bold',
        fontSize: 26,
        marginBottom: 5,
        color: '#fff',
        textAlign: 'center'
    },
    price: {
        color: '#155dfc',
        fontWeight: 'bold',
        fontSize: 28,
        marginBottom: 5,
        textShadowRadius: 4,
    },
    chipRowMain: {
        marginTop: 5,
        flexDirection: 'row',
        gap: 2,
        marginBottom: 5,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    chipRow: {
        flexDirection: 'row',
        gap: 1,
        marginBottom: 5,
        justifyContent: 'space-between'
    },
    chip: {
        backgroundColor: 'rgba(21,93,252,0.12)',
        color: '#155dfc',
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 4,
        fontWeight: 'bold',
        fontSize: 14,
        marginRight: 8,
        overflow: 'hidden',
    },
    sellerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5
    },
    sellerView: {
        flexDirection: 'row',
        gap: 3,
        alignItems: 'center'
    },
    seller: {
        fontSize: 16,
        marginBottom: 4,
        color: '#333',
    },
    sellerText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#333',
    },
    stars: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 6
    },
    sellerReviews: {
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 6,
    },
    reviews: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        backgroundColor: 'rgba(21,93,252,0.12)',
        color: '#155dfc',
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 4,
        fontWeight: 'bold',
        fontSize: 14,
        marginRight: 8,
        overflow: 'hidden',
    },
    reviewText: {
        color: '#155dfc',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 4
    },
    ratingText: {
        color: '#888',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 4
    },
    location: {
        fontSize: 16,
        marginBottom: 4,
        color: '#333',
    },
    description: {
        fontSize: 15,
        marginBottom: 12,
        color: '#444',
        fontStyle: 'italic',
    },
    posted: {
        fontSize: 13,
        color: '#888',
        marginTop: 5,
        alignSelf: 'flex-end',
    },
    buttons: {
        width: '100%',
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    messageButton: {
        width: '50%',
        justifyContent: 'center',
        backgroundColor: '#155dfc',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        margin: 0,
    },
    addFavoriteButton: {
        width: '50%',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#155dfc',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        margin: 0,
    },
    buttonText: {
        color: '#155dfc',
        fontSize: 16,
        fontWeight: 'bold'
    },
    buttonText1: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    separator: {
        marginTop: 8,
        marginBottom: 5,
        borderWidth: 0.5,
        borderColor: 'gray',
    }
});


