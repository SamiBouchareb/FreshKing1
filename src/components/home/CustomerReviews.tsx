import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { LuClock3 } from 'react-icons/lu';
import { IoLeafOutline } from 'react-icons/io5';

// Sample review data with enhanced content
const reviews = [
    {
        name: "Sarah Mitchell",
        rating: 5,
        text: "Absolutely love the fresh salads and smoothies! The ingredients are always top quality and the service is fantastic. Best healthy food spot in Hamburg!",
        date: "2 weeks ago",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
        location: "Hamburg, DE",
        verified: true
    },
    {
        name: "Michael Klein",
        rating: 5,
        text: "Their bowls are not only delicious but also beautifully presented. The staff is knowledgeable and the atmosphere is perfect. My daily lunch spot!",
        date: "1 month ago",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
        location: "Hamburg, DE",
        verified: true
    },
    {
        name: "Emma Rodriguez",
        rating: 5,
        text: "The acai bowls are incredible! Fresh ingredients, amazing flavor combinations, and the presentation is Instagram-worthy. This place is a gem!",
        date: "3 weeks ago",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
        location: "Hamburg, DE",
        verified: true
    },
    {
        name: "David Lehmann",
        rating: 5,
        text: "Incredible variety of healthy options. The green smoothie bowl changed my perspective on healthy eating. Worth every penny!",
        date: "1 week ago",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
        location: "Hamburg, DE",
        verified: true
    },
    {
        name: "Lisa Peters",
        rating: 5,
        text: "The smoothies are amazing! Love that they use all natural ingredients. The portions are generous and the staff is always friendly.",
        date: "2 months ago",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
        location: "Hamburg, DE",
        verified: true
    }
];

const duplicatedReviews = [...reviews, ...reviews, ...reviews];

const CustomerReviews: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

    return (
        <motion.div
            ref={containerRef}
            style={{ opacity, scale }}
            className="relative w-full bg-gradient-to-b from-white via-green-50/5 to-white py-32 overflow-hidden"
        >
            {/* Decorative Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(134,239,172,0.1),_transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(134,239,172,0.1),_transparent_70%)]" />
            <div className="absolute top-40 left-20 w-72 h-72 bg-green-100/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-40 right-20 w-96 h-96 bg-green-50/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '-2s' }} />
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header with Enhanced Animation */}
                <div className="text-center mb-20 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-6"
                    >
                        <div className="flex items-center justify-center gap-2 text-green-600 font-medium">
                            <IoLeafOutline className="w-5 h-5" />
                            <span>CUSTOMER TESTIMONIALS</span>
                        </div>
                        
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
                            What Our Customers Say
                        </h2>

                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-24 h-1.5 bg-gradient-to-r from-green-400 to-green-600 rounded-full" />
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                                Join thousands of satisfied customers who've discovered the perfect blend of health and taste
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Reviews Scroll Container with Enhanced Design */}
                <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white/40 to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white/40 to-transparent z-10" />

                    <div className="overflow-hidden">
                        <motion.div
                            className="flex gap-6 py-8 px-20"
                            animate={{
                                x: [-20, -(reviews.length * 380)],
                            }}
                            transition={{
                                duration: 40,
                                ease: "linear",
                                repeat: Infinity,
                            }}
                        >
                            {duplicatedReviews.map((review, index) => (
                                <motion.div
                                    key={index}
                                    className="flex-none w-[350px] backdrop-blur-sm rounded-2xl p-8 bg-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 hover:border-green-200/50 transition-all duration-300"
                                    whileHover={{
                                        y: -5,
                                        scale: 1.02,
                                        transition: { duration: 0.2 }
                                    }}
                                >
                                    {/* Card content wrapper for consistent height */}
                                    <div className="flex flex-col h-full">
                                        {/* Header with image and rating */}
                                        <div className="flex items-start gap-4 mb-6">
                                            <div className="relative">
                                                <img
                                                    src={review.image}
                                                    alt={review.name}
                                                    className="w-14 h-14 rounded-full object-cover ring-2 ring-green-100 ring-offset-2"
                                                />
                                                {review.verified && (
                                                    <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full">
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{review.name}</h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className="flex gap-0.5">
                                                        {[...Array(review.rating)].map((_, i) => (
                                                            <FaStar key={i} className="text-green-500 w-4 h-4" />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Review content with flex-grow to push timestamp to bottom */}
                                        <div className="flex-grow">
                                            <div className="relative">
                                                <FaQuoteLeft className="absolute -top-3 -left-2 text-green-200/50 w-8 h-8" />
                                                <p className="text-gray-600 leading-relaxed pl-4 min-h-[80px]">
                                                    {review.text}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Timestamp at bottom */}
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-4 pl-4">
                                            <LuClock3 className="w-4 h-4" />
                                            <span>{review.date}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Enhanced Google Reviews Badge */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <motion.div
                        className="inline-flex items-center gap-3 px-8 py-4 bg-white rounded-full shadow-lg border border-gray-100/50 hover:border-green-200/50 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                            alt="Google"
                            className="w-6 h-6"
                        />
                        <div className="flex items-center gap-3">
                            <div>
                                <span className="font-semibold text-gray-900 text-lg">4.9</span>
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className="text-green-500 w-4 h-4" />
                                    ))}
                                </div>
                            </div>
                            <div className="h-8 w-px bg-gray-200" />
                            <span className="text-gray-600">500+ verified reviews</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default CustomerReviews;
