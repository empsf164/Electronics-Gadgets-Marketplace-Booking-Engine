/**
 * VOLTARA - Dynamic Pricing & Instant Quote Calculation Engine
 */

const VoltaraPricing = {
  // Default configuration
  CONVENIENCE_FEE: 99,
  TAX_PERCENTAGE: 0.18, // 18% GST/Tech Service Tax
  DEFAULT_DEPOSIT_PERCENTAGE: 25, // 25% Deposit required

  // Calculate complete itemized breakdown
  calculateQuote: function (params) {
    const {
      serviceId = "screen-replacement",
      deviceType = "Smartphones",
      deviceModel = "iPhone 15 Pro Max",
      urgencyId = "standard",
      selectedAddonIds = [],
      hostId = null,
      customBasePrice = null
    } = params;

    const service = VoltaraDB.getServiceById(serviceId);
    let basePrice = customBasePrice !== null ? customBasePrice : service.basePrice;

    // Optional device tier multiplier
    let deviceTierMultiplier = 1.0;
    const modelLower = (deviceModel || "").toLowerCase();
    if (modelLower.includes("pro max") || modelLower.includes("ultra") || modelLower.includes("m3") || modelLower.includes("rtx 4090")) {
      deviceTierMultiplier = 1.15;
    } else if (modelLower.includes("pro") || modelLower.includes("plus") || modelLower.includes("m2")) {
      deviceTierMultiplier = 1.08;
    }
    
    // Adjust base price with device factor
    const adjustedBasePrice = Math.round(basePrice * deviceTierMultiplier);

    // Calculate Urgency Fee
    let urgencyFee = 0;
    let urgencyLabel = "Standard (24h)";
    if (service.urgencyLevels) {
      const selectedUrgency = service.urgencyLevels.find(u => u.id === urgencyId) || service.urgencyLevels[0];
      urgencyFee = selectedUrgency.fee;
      urgencyLabel = selectedUrgency.label;
    }

    // Calculate Add-ons
    let addonsTotal = 0;
    const itemizedAddons = [];
    if (service.addons && Array.isArray(selectedAddonIds)) {
      service.addons.forEach(addon => {
        if (selectedAddonIds.includes(addon.id)) {
          addonsTotal += addon.price;
          itemizedAddons.push({
            id: addon.id,
            label: addon.label,
            price: addon.price
          });
        }
      });
    }

    // Subtotal before tax & fees
    const subtotal = adjustedBasePrice + urgencyFee + addonsTotal;
    const convenienceFee = this.CONVENIENCE_FEE;
    const taxAmount = Math.round((subtotal + convenienceFee) * this.TAX_PERCENTAGE);
    const grandTotal = subtotal + convenienceFee + taxAmount;

    // Deposit Calculation (Host can customize deposit %)
    let depositPct = this.DEFAULT_DEPOSIT_PERCENTAGE;
    if (hostId) {
      const host = VoltaraDB.getHostById(hostId);
      if (host && host.depositPercentage) {
        depositPct = host.depositPercentage;
      }
    }

    const depositDueToday = Math.round(grandTotal * (depositPct / 100));
    const remainingBalance = grandTotal - depositDueToday;

    return {
      serviceTitle: service.title,
      deviceModel,
      deviceTierMultiplier,
      adjustedBasePrice,
      urgencyLabel,
      urgencyFee,
      itemizedAddons,
      addonsTotal,
      convenienceFee,
      taxAmount,
      taxPercentage: this.TAX_PERCENTAGE * 100,
      grandTotal,
      depositPercentage: depositPct,
      depositDueToday,
      remainingBalance,
      currency: VOLTARA_DATA.brand.currency,
      formattedGrandTotal: VoltaraDB.formatCurrency(grandTotal),
      formattedDeposit: VoltaraDB.formatCurrency(depositDueToday),
      formattedRemaining: VoltaraDB.formatCurrency(remainingBalance)
    };
  }
};

// Export to window
if (typeof window !== 'undefined') {
  window.VoltaraPricing = VoltaraPricing;
}
