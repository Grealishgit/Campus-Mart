import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import SafeScreen from '@/components/SafeScreen';
import { Ionicons } from '@expo/vector-icons';

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
                            </View>
                            <View>
                                <Text style={styles.price}>{productObj.price} {productObj.priceValue}</Text>
                            </View>
                        </View>
                        <View style={styles.sellerContainer}>
                            <Text style={styles.seller}>
                                Seller:  {productObj.seller}
                            </Text>

                            <View style={styles.stars}>
                                {renderStars(productObj.sellerRating)}
                                <Text style={styles.ratingText}>({productObj.sellerRating})</Text>
                            </View>

                        </View>

                        <View style={styles.sellerContainer}>
                            <Text style={styles.location}>
                                Location:
                                <Text style={{ fontWeight: 'bold' }}>
                                    {productObj.location}
                                </Text>
                            </Text>
                            <View style={styles.reviews}>
                                <View style={styles.sellerReviews}>
                                    <Text>
                                        {productObj.sellerReviews}
                                    </Text>
                                </View>
                                <Text style={styles.reviewText}>Reviews</Text>
                            </View>
                        </View>

                        <Text style={styles.description}>{productObj.description}</Text>
                        <Text style={styles.posted}>Posted: {productObj.postedDate}</Text>
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
        marginBottom: 12,
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
        marginBottom: 8,
        color: '#fff',
        textAlign: 'center'
    },
    price: {
        color: '#155dfc',
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 10,
        textShadowRadius: 4,
    },
    chipRowMain: {
        marginTop: 10,
        flexDirection: 'row',
        gap: 8,
        marginBottom: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    chipRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 10,
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
        alignItems: 'center'
    },
    seller: {
        fontSize: 16,
        marginBottom: 4,
        color: '#333',
    },
    stars: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 6
    },
    sellerReviews: {
        width: 24,
        alignItems: 'center',
        height: 24,
        borderColor: '#155dfc',
        borderRadius: 12,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 6,
    },
    reviews: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2
    },
    reviewText: {
        color: '#000',
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
        marginTop: 8,
        alignSelf: 'flex-end',
    },
});


