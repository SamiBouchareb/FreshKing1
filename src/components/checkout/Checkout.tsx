import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';
import { CreditCard, Lock, ChevronRight, CheckCircle, MapPin, Mail, User } from 'lucide-react';
import ReactConfetti from 'react-confetti';

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface StepProps {
  children: React.ReactNode;
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive: boolean;
  isCompleted: boolean;
  onStepClick?: () => void;
}

const Step: React.FC<StepProps> = ({ children, title, description, icon, isActive, isCompleted, onStepClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-white rounded-2xl p-6 shadow-lg ${isActive ? 'ring-2 ring-green-500' : ''} 
      ${isCompleted ? 'cursor-pointer hover:bg-gray-50 transition-colors' : ''}`}
    onClick={() => isCompleted ? onStepClick?.() : undefined}
  >
    <div className="flex items-start gap-4 mb-6">
      <div className={`p-3 rounded-xl ${
        isActive ? 'bg-green-500 text-white' : 
        isCompleted ? 'bg-green-100 text-green-500' : 
        'bg-gray-100 text-gray-500'
      }`}>
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          {title}
          {isCompleted && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-green-500 text-sm"
            >
              (Click to edit)
            </motion.span>
          )}
        </h3>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
    {isActive && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {children}
      </motion.div>
    )}
  </motion.div>
);

const InputField = ({ label, icon, ...props }: any) => (
  <div className="relative">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        {icon}
      </div>
      <input
        {...props}
        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
      />
    </div>
  </div>
);

const OrderSummaryItem = ({ item, quantity }: { item: any; quantity: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-center gap-4 py-3"
  >
    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
    <div className="flex-grow">
      <h4 className="font-medium text-gray-900">{item.name}</h4>
      <p className="text-sm text-gray-500">Quantity: {quantity}</p>
    </div>
    <p className="font-medium text-gray-900">${(item.price * quantity).toFixed(2)}</p>
  </motion.div>
);

export function Checkout() {
  const { items, cartItems, getTotalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsSuccess(true);
    setShowConfetti(true);
    clearCart();

    // Stop confetti after 5 seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen flex items-center justify-center bg-gray-50 px-4 relative overflow-hidden"
      >
        {showConfetti && (
          <ReactConfetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={200}
            gravity={0.2}
            colors={['#22c55e', '#16a34a', '#15803d', '#166534', '#dcfce7']}
          />
        )}
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-500" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Confirmed!</h2>
            <p className="text-gray-500 mb-8">
              Thank you for your order. We'll send you a confirmation email shortly.
            </p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="px-8 py-3"
            >
              Return to Home
            </Button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Checkout Form */}
          <div className="space-y-6">
            <Step
              title="Personal Information"
              description="Enter your contact details"
              icon={<User className="w-6 h-6" />}
              isActive={currentStep === 1}
              isCompleted={currentStep > 1}
              onStepClick={() => setCurrentStep(1)}
            >
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="First Name"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  icon={<User className="w-4 h-4" />}
                />
                <InputField
                  label="Last Name"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  icon={<User className="w-4 h-4" />}
                />
              </div>
              <div className="mt-4">
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  icon={<Mail className="w-4 h-4" />}
                />
              </div>
              <Button
                className="mt-6"
                onClick={() => setCurrentStep(2)}
              >
                Continue to Shipping
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Step>

            <Step
              title="Shipping Address"
              description="Where should we deliver your order?"
              icon={<MapPin className="w-6 h-6" />}
              isActive={currentStep === 2}
              isCompleted={currentStep > 2}
              onStepClick={() => setCurrentStep(2)}
            >
              <InputField
                label="Street Address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleInputChange}
                required
                icon={<MapPin className="w-4 h-4" />}
              />
              <div className="grid grid-cols-2 gap-4 mt-4">
                <InputField
                  label="City"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  icon={<MapPin className="w-4 h-4" />}
                />
                <InputField
                  label="ZIP Code"
                  name="zipCode"
                  type="text"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                  icon={<MapPin className="w-4 h-4" />}
                />
              </div>
              <Button
                className="mt-6"
                onClick={() => setCurrentStep(3)}
              >
                Continue to Payment
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Step>

            <Step
              title="Payment Information"
              description="Enter your payment details"
              icon={<CreditCard className="w-6 h-6" />}
              isActive={currentStep === 3}
              isCompleted={currentStep > 3}
              onStepClick={() => setCurrentStep(3)}
            >
              <div className="space-y-4">
                <InputField
                  label="Card Number"
                  name="cardNumber"
                  type="text"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="1234 5678 9012 3456"
                  icon={<CreditCard className="w-4 h-4" />}
                />
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Expiry Date"
                    name="expiryDate"
                    type="text"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                    placeholder="MM/YY"
                    icon={<CreditCard className="w-4 h-4" />}
                  />
                  <InputField
                    label="CVV"
                    name="cvv"
                    type="text"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    required
                    placeholder="123"
                    icon={<Lock className="w-4 h-4" />}
                  />
                </div>
                <Button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="w-full mt-6 py-3 text-base font-medium flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Complete Order
                    </>
                  )}
                </Button>
              </div>
            </Step>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:self-start lg:sticky lg:top-24 lg:h-fit">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              <div className="divide-y">
                {items.map(item => (
                  <OrderSummaryItem
                    key={item.id}
                    item={item}
                    quantity={cartItems[item.id]}
                  />
                ))}
              </div>
              <div className="border-t border-gray-200 mt-6 pt-6 space-y-3">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>Total</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-6 bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <Lock className="w-4 h-4" />
                  <span>Secure checkout powered by Stripe</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
