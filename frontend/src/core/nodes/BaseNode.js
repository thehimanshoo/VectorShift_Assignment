import { Handle, Position } from 'reactflow';
import '../styles/nodeStyles.css';

const GAP = 24;

export default function BaseNode({
  id,
  title,
  inputs = [],        // [{ id }]
  outputs = [],       // [{ id }]
  children,
}) {
  return (
    <div className="vs-node">
      {/* left‑side handles */}
      {inputs.map((h, i) => (
        <Handle
          key={h.id}
          type="target"
          position={Position.Left}
          id={h.id}
          style={{ top: `${(i + 1) * GAP}px` }}
        />
      ))}

      <div className="vs-node-header">{title}</div>
      <div className="vs-node-body">{children}</div>

      {/* right‑side handles */}
      {outputs.map((h, i) => (
        <Handle
          key={h.id}
          type="source"
          position={Position.Right}
          id={h.id}
          style={{ top: `${(i + 1) * GAP}px` }}
        />
      ))}
    </div>
  );
}
