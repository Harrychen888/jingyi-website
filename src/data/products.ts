export type Product = {
  slug: string;
  model: string;
  name: string;
  enName: string;
  category: string;
  enCategory: string;
  description: string;
  enDescription: string;
  features: string[];
  enFeatures: string[];
  specs: {
    label: string;
    value: string;
  }[];
  image: string;
  detailImages?: string[];
};

const sharedFeatures = [
  "进口高刚性丝杆、导轨、联轴器等运动部件，稳定性好、精度高",
  "三轴线轨，高速、高精度、摩擦量小，使用寿命长",
  "优选国际一线品牌 CE 认证元器件",
  "LED 光源，工作环境更明亮",
  "总线式系统，电气系统更稳定",
  "德国技艺床身，刚性好、精度高",
  "配置台湾数控回转台",
  "欧盟级安全标准，适合出口使用",
];

const sharedEnFeatures = [
  "Imported high-rigidity ball screws, guide rails and couplings ensure stability and high precision",
  "Three-axis linear guide structure with high speed, high precision, low friction and long service life",
  "Selected international first-tier CE-certified electrical components",
  "LED lighting provides a brighter working environment",
  "Bus control system improves electrical stability",
  "Rigid, high-precision machine bed based on German manufacturing know-how",
  "Equipped with Taiwan CNC rotary table",
  "EU-level safety standards suitable for export applications",
];

export const products: Product[] = [
  {
    slug: "yz-084c",
    model: "YZ-084C",
    name: "数控插铣床",
    enName: "CNC Slotting-Milling Machine",
    category: "数控专用机床",
    enCategory: "CNC Special-Purpose Machine",
    description:
      "YZ-084C 数控插铣床适用于连接器零部件的插削、铣削等复合加工场景，具备高精度、高稳定性和良好的批量加工适应能力。",
    enDescription:
      "The YZ-084C CNC slotting-milling machine is designed for connector parts requiring combined slotting and milling operations, delivering high precision, stable performance and strong batch-production adaptability.",
    features: [...sharedFeatures.slice(0, 6), "配置专利产品插铣动力头", ...sharedFeatures.slice(6)],
    enFeatures: [...sharedEnFeatures.slice(0, 6), "Equipped with patented slotting-milling power head", ...sharedEnFeatures.slice(6)],
    specs: [
      { label: "总电机功率", value: "9kW" },
      { label: "插削主轴电机功率", value: "0.75kW" },
      { label: "铣削主轴电机功率", value: "1.1kW" },
      { label: "冷却泵功率", value: "0.65kW" },
      { label: "X轴行程", value: "200mm" },
      { label: "Y轴", value: "360°" },
      { label: "Z轴行程", value: "200mm" },
      { label: "插削头行程", value: "25mm" },
      { label: "X轴快速进给", value: "10000mm/min" },
      { label: "Z轴快速进给", value: "10000mm/min" },
      { label: "插削主轴转速", value: "30-180次/min" },
      { label: "X/Z轴重复定位精度", value: "±0.005mm" },
      { label: "X/Z轴定位精度", value: "±0.008mm" },
      { label: "工作台尺寸", value: "600×400mm" },
      { label: "冷却油箱容积", value: "100L" },
      { label: "净重", value: "2500kg" },
    ],
    image: "/assets/products/yz-090b-workshop.jpg",
    detailImages: ["/assets/applications/connector-sample.jpg"],
  },
  {
    slug: "yz-092c",
    model: "YZ-092C",
    name: "数控螺旋槽铣床",
    enName: "CNC Spiral Groove Milling Machine",
    category: "数控专用机床",
    enCategory: "CNC Special-Purpose Machine",
    description:
      "YZ-092C 数控螺旋槽铣床主要面向连接器及精密圆形零部件的螺旋槽、开槽、铣削加工需求，适用于高精度、小批量及批量稳定生产场景。",
    enDescription:
      "The YZ-092C CNC spiral groove milling machine is built for spiral groove, slotting and milling processes on connectors and precision round parts, supporting high-precision small-batch and stable batch production.",
    features: [...sharedFeatures.slice(0, 6), "配置专利产品钻铣动力头", ...sharedFeatures.slice(6)],
    enFeatures: [...sharedEnFeatures.slice(0, 6), "Equipped with patented drilling-milling power head", ...sharedEnFeatures.slice(6)],
    specs: [
      { label: "总电机功率", value: "8kW" },
      { label: "铣头主轴电机功率", value: "0.75kW" },
      { label: "冷却泵功率", value: "0.65kW" },
      { label: "X轴行程", value: "200mm" },
      { label: "Y轴", value: "360°" },
      { label: "Z轴行程", value: "200mm" },
      { label: "X/Y/Z轴快速进给", value: "10000mm/min" },
      { label: "铣削主轴转速", value: "150-6000r/min" },
      { label: "X/Z轴重复定位精度", value: "±0.005mm" },
      { label: "X/Z轴定位精度", value: "±0.008mm" },
      { label: "A轴重复定位精度", value: "20″" },
      { label: "A轴定位精度", value: "6″" },
      { label: "工作台尺寸", value: "600×400mm" },
      { label: "最大承载重量", value: "200kg" },
      { label: "冷却油箱容积", value: "100L" },
      { label: "净重", value: "2300kg" },
    ],
    image: "/assets/products/yz-090b-workshop.jpg",
    detailImages: ["/assets/applications/j599-connectors.jpg"],
  },
  {
    slug: "yz-090a",
    model: "YZ-090A",
    name: "五轴插铣中心",
    enName: "Five-Axis Slotting-Milling Center",
    category: "五轴加工设备",
    enCategory: "Five-Axis Machining Equipment",
    description:
      "YZ-090A 五轴插铣中心面向高复杂度连接器零部件加工需求，集插削、铣削、多轴联动加工能力于一体，适用于航空、航天、电子连接器等高精度制造场景。",
    enDescription:
      "The YZ-090A five-axis slotting-milling center integrates slotting, milling and multi-axis machining for complex connector parts in aerospace, aviation and electronic connector applications.",
    features: [...sharedFeatures.slice(0, 6), "配置专利产品立式插削头", ...sharedFeatures.slice(6)],
    enFeatures: [...sharedEnFeatures.slice(0, 6), "Equipped with patented vertical slotting head", ...sharedEnFeatures.slice(6)],
    specs: [
      { label: "总电机功率", value: "20kW" },
      { label: "插削主轴电机功率", value: "1.1kW" },
      { label: "铣削主轴电机功率", value: "7.5kW" },
      { label: "主轴锥度", value: "ISO40 / BT40" },
      { label: "最大面铣直径", value: "Ø80mm" },
      { label: "最大立铣直径", value: "Ø38mm" },
      { label: "X/Y/Z行程", value: "650 / 500 / 500mm" },
      { label: "A轴", value: "-30°~+120°" },
      { label: "C轴", value: "360°" },
      { label: "插削行程", value: "25mm" },
      { label: "刀库容量", value: "16 tools" },
      { label: "刀具最大尺寸", value: "Ø120mm" },
      { label: "刀具最大重量", value: "8kg" },
      { label: "换刀时间", value: "5 seconds" },
      { label: "铣削主轴转速", value: "10-10000r/min" },
      { label: "插削主轴转速", value: "50-180次/min" },
      { label: "X/Y/Z轴快速进给", value: "36000mm/min" },
      { label: "X/Y/Z重复定位精度", value: "±0.005mm" },
      { label: "X/Y/Z定位精度", value: "±0.008mm" },
      { label: "工作台尺寸", value: "900×450mm" },
      { label: "最大承载重量", value: "350kg" },
      { label: "冷却油箱容积", value: "210L" },
      { label: "净重", value: "4000kg" },
    ],
    image: "/assets/products/yz-090b.jpg",
    detailImages: ["/assets/products/yz-090b-workshop.jpg", "/assets/applications/connector-sample.jpg"],
  },
  {
    slug: "yz-090b",
    model: "YZ-090B",
    name: "数控立式插铣中心",
    enName: "CNC Vertical Slotting-Milling Center",
    category: "数控加工中心",
    enCategory: "CNC Machining Center",
    description:
      "YZ-090B 数控立式插铣中心适用于连接器壳体、精密结构件及复杂槽型零部件的高效加工，兼顾加工刚性、精度稳定性与批量生产效率。",
    enDescription:
      "The YZ-090B CNC vertical slotting-milling center is suitable for connector housings, precision structural parts and complex groove components, balancing rigidity, precision stability and batch efficiency.",
    features: [...sharedFeatures.slice(0, 6), "配置专利产品立式插削头", ...sharedFeatures.slice(6)],
    enFeatures: [...sharedEnFeatures.slice(0, 6), "Equipped with patented vertical slotting head", ...sharedEnFeatures.slice(6)],
    specs: [
      { label: "总电机功率", value: "18kW" },
      { label: "插削主轴电机功率", value: "1.1kW" },
      { label: "铣削主轴电机功率", value: "7.5kW" },
      { label: "主轴锥度", value: "ISO40 / BT40" },
      { label: "最大面铣直径", value: "Ø80mm" },
      { label: "最大立铣直径", value: "Ø38mm" },
      { label: "X/Y/Z行程", value: "650 / 400 / 400mm" },
      { label: "A轴", value: "360°" },
      { label: "插削行程", value: "25mm" },
      { label: "刀库容量", value: "16 tools" },
      { label: "刀具最大尺寸", value: "Ø120mm" },
      { label: "刀具最大重量", value: "8kg" },
      { label: "换刀时间", value: "5 seconds" },
      { label: "铣削主轴转速", value: "10-10000r/min" },
      { label: "插削主轴转速", value: "50-180次/min" },
      { label: "X/Y/Z轴快速进给", value: "36000mm/min" },
      { label: "X/Y/Z重复定位精度", value: "±0.005mm" },
      { label: "X/Y/Z定位精度", value: "±0.008mm" },
      { label: "工作台尺寸", value: "800×500mm" },
      { label: "最大承载重量", value: "350kg" },
      { label: "冷却油箱容积", value: "210L" },
      { label: "净重", value: "3800kg" },
    ],
    image: "/assets/products/yz-090b.jpg",
    detailImages: ["/assets/products/yz-090b-workshop.jpg", "/assets/applications/connector-sample.jpg"],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
