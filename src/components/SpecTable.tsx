type SpecTableProps = {
  specs: {
    label: string;
    value: string;
  }[];
};

export function SpecTable({ specs }: SpecTableProps) {
  return (
    <div className="overflow-hidden border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <tbody>
            {specs.map((spec, index) => (
              <tr key={`${spec.label}-${index}`} className="border-b border-slate-100 last:border-0">
                <th className="w-1/2 bg-slate-50 px-4 py-3 font-semibold text-navy-900">{spec.label}</th>
                <td className="px-4 py-3 font-mono text-slate-700">{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
