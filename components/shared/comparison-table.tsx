import { Check, X } from 'lucide-react'

interface Feature {
  name: string
  starter?: boolean | string
  professional?: boolean | string
  enterprise?: boolean | string
}

interface ComparisonTableProps {
  features: Feature[]
}

export function ComparisonTable({ features }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-cyan-500/20">
            <th className="text-left py-4 px-4 font-semibold text-white">Feature</th>
            <th className="text-center py-4 px-4 font-semibold text-cyan-400">Starter</th>
            <th className="text-center py-4 px-4 font-semibold text-cyan-400">Professional</th>
            <th className="text-center py-4 px-4 font-semibold text-cyan-400">Enterprise</th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr
              key={index}
              className="border-b border-cyan-500/10 hover:bg-cyan-500/5 transition-colors"
            >
              <td className="py-4 px-4 text-slate-300">{feature.name}</td>
              <td className="py-4 px-4 text-center">
                {typeof feature.starter === 'boolean' ? (
                  feature.starter ? (
                    <Check size={20} className="mx-auto text-green-400" />
                  ) : (
                    <X size={20} className="mx-auto text-slate-600" />
                  )
                ) : (
                  <span className="text-slate-400">{feature.starter}</span>
                )}
              </td>
              <td className="py-4 px-4 text-center">
                {typeof feature.professional === 'boolean' ? (
                  feature.professional ? (
                    <Check size={20} className="mx-auto text-green-400" />
                  ) : (
                    <X size={20} className="mx-auto text-slate-600" />
                  )
                ) : (
                  <span className="text-slate-400">{feature.professional}</span>
                )}
              </td>
              <td className="py-4 px-4 text-center">
                {typeof feature.enterprise === 'boolean' ? (
                  feature.enterprise ? (
                    <Check size={20} className="mx-auto text-green-400" />
                  ) : (
                    <X size={20} className="mx-auto text-slate-600" />
                  )
                ) : (
                  <span className="text-slate-400">{feature.enterprise}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
