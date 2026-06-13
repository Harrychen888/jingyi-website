"use client";

import { FormEvent, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { ui } from "@/lib/i18n";

type ContactFormProps = {
  lang: Lang;
};

export function ContactForm({ lang }: ContactFormProps) {
  const [sent, setSent] = useState(false);
  const labels = ui[lang];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log("contact inquiry", Object.fromEntries(formData));
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-navy-900">
          {lang === "en" ? "Name" : "姓名"}
          <input name="name" required className="border border-slate-300 px-3 py-3 font-normal outline-none focus:border-signal" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-navy-900">
          {lang === "en" ? "Company" : "公司名称"}
          <input name="company" className="border border-slate-300 px-3 py-3 font-normal outline-none focus:border-signal" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-navy-900">
          {lang === "en" ? "Phone" : "联系电话"}
          <input name="phone" required className="border border-slate-300 px-3 py-3 font-normal outline-none focus:border-signal" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-navy-900">
          {lang === "en" ? "Email" : "邮箱"}
          <input name="email" type="email" className="border border-slate-300 px-3 py-3 font-normal outline-none focus:border-signal" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-navy-900 md:col-span-2">
          {lang === "en" ? "Requirement Type" : "需求类型"}
          <select name="type" className="border border-slate-300 px-3 py-3 font-normal outline-none focus:border-signal">
            <option>{lang === "en" ? "Equipment Inquiry" : "设备咨询"}</option>
            <option>{lang === "en" ? "Custom Machine" : "专机定制"}</option>
            <option>{lang === "en" ? "Connector Machining Solution" : "连接器加工方案"}</option>
            <option>{lang === "en" ? "After-sales Service" : "售后服务"}</option>
            <option>{lang === "en" ? "Other" : "其他"}</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-navy-900 md:col-span-2">
          {lang === "en" ? "Requirement Description" : "需求描述"}
          <textarea
            name="message"
            rows={5}
            className="border border-slate-300 px-3 py-3 font-normal outline-none focus:border-signal"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-navy-900 md:col-span-2">
          {lang === "en" ? "Upload Drawing / File" : "上传图纸/文件"}
          <input name="file" type="file" className="border border-dashed border-slate-300 px-3 py-3 text-sm font-normal" />
        </label>
      </div>
      <button type="submit" className="mt-5 w-full bg-signal px-5 py-4 text-sm font-bold text-white hover:bg-orange-600">
        {labels.submitInquiry}
      </button>
      {sent ? (
        <p className="mt-4 text-sm font-semibold text-navy-800">
          {lang === "en" ? "Inquiry captured in the frontend console. The /api/contact endpoint is reserved for future integration." : "询盘内容已记录在前端控制台，后续可接入 /api/contact。"}
        </p>
      ) : null}
    </form>
  );
}
