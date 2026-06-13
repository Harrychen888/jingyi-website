export type Lang = "zh" | "en";

export function pick<T>(lang: Lang, zh: T, en: T): T {
  return lang === "en" ? en : zh;
}

export const ui = {
  zh: {
    quote: "获取方案",
    viewProducts: "查看产品中心",
    getSolution: "获取专机方案",
    contactEngineer: "联系工程师",
    viewDetails: "查看详情",
    getQuote: "获取报价",
    allProducts: "全部产品",
    allCases: "全部案例",
    consultSolution: "咨询方案",
    consultSimilar: "咨询类似方案",
    relatedProduct: "关联设备",
    submitInquiry: "提交询盘",
    productBrochure: "查看产品样册",
    sendInquiry: "发送询盘",
    viewProduct: "查看产品",
    languageLabel: "EN",
    footerNav: "网站导航",
    contactInfo: "联系方式",
  },
  en: {
    quote: "Get Solution",
    viewProducts: "Products",
    getSolution: "Custom Solution",
    contactEngineer: "Contact Engineer",
    viewDetails: "Details",
    getQuote: "Get Quote",
    allProducts: "All Products",
    allCases: "All Cases",
    consultSolution: "Consult",
    consultSimilar: "Consult Similar Project",
    relatedProduct: "Related Equipment",
    submitInquiry: "Submit Inquiry",
    productBrochure: "View Brochure",
    sendInquiry: "Send Inquiry",
    viewProduct: "View Products",
    languageLabel: "中文",
    footerNav: "Navigation",
    contactInfo: "Contact",
  },
} as const;
