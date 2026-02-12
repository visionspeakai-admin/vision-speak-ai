import { CodeBlock } from './code-block'

interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: string
  description: string
  requestCode: string
  responseCode: string
}

interface APIReferenceProps {
  endpoints: Endpoint[]
}

const methodColors = {
  GET: 'text-blue-400 bg-blue-500/10',
  POST: 'text-green-400 bg-green-500/10',
  PUT: 'text-yellow-400 bg-yellow-500/10',
  DELETE: 'text-red-400 bg-red-500/10',
}

export function APIReference({ endpoints }: APIReferenceProps) {
  return (
    <div className="space-y-8">
      {endpoints.map((endpoint, index) => (
        <div key={index} className="glass-effect rounded-xl p-6 border border-cyan-500/20">
          {/* Method & Path */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`px-3 py-1 rounded font-mono font-bold text-sm ${
                methodColors[endpoint.method]
              }`}
            >
              {endpoint.method}
            </span>
            <code className="text-cyan-300 font-mono">{endpoint.path}</code>
          </div>

          {/* Description */}
          <p className="text-slate-400 mb-6">{endpoint.description}</p>

          {/* Request Example */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-white mb-3">Request</h4>
            <CodeBlock
              code={endpoint.requestCode}
              language="json"
              title="Example Request"
            />
          </div>

          {/* Response Example */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Response</h4>
            <CodeBlock
              code={endpoint.responseCode}
              language="json"
              title="Example Response"
            />
          </div>
        </div>
      ))}
    </div>
  )
}
