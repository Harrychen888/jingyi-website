import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getLang } from "@/lib/i18n-server";

export const metadata: Metadata = {
  title: {
    default: "扬州精艺机电有限公司｜连接器行业数控专用机床制造商",
    template: "%s｜扬州精艺机电有限公司",
  },
  description:
    "扬州精艺机电有限公司专注于光电连接器、电连接器及精密零部件加工领域，提供数控插铣床、螺旋槽铣床、五轴插铣中心、数控立式插铣中心等专用设备。",
  keywords: [
    "扬州精艺机电",
    "数控插铣床",
    "数控螺旋槽铣床",
    "五轴插铣中心",
    "数控立式插铣中心",
    "连接器加工设备",
    "光电连接器加工",
    "电连接器加工",
    "专用机床",
    "数控专用机床",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getLang();

  return (
    <html lang={lang === "en" ? "en" : "zh-CN"} data-scroll-behavior="smooth">
      <body>
        <Header lang={lang} />
        {children}
        <Footer lang={lang} />
      </body>
    </html>
  );
}
