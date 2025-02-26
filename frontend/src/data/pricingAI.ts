// utils/pricingAI.ts
export const calculateDynamicPrice = (basePrice: number, availability: number): number => {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
    
    let priceMultiplier = 1;
  
    // 1️⃣ Increase price on weekends (Friday-Sunday)
    if (dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0) {
      priceMultiplier += 0.2; // +20% increase
    }
  
    // 2️⃣ Increase price if availability is low (less than 5 cars left)
    if (availability < 5) {
      priceMultiplier += 0.3; // +30% increase
    }
  
    // 3️⃣ Random small fluctuations (for AI-like behavior)
    const randomFactor = 1 + Math.random() * 0.1; // Between 1.0 - 1.1
    
    return Math.round(basePrice * priceMultiplier * randomFactor);
  };
  