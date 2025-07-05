import { useState } from 'react';
import BaseNode from '../core/nodes/BaseNode';
export const DelayNode = ({ id }) => {
  const [ms, setMs] = useState(1000);
  return (
    <BaseNode
      id={id}
      title="Delay"
      inputs={[{ id: `${id}-in` }]}
      outputs={[{ id: `${id}-out` }]}
    >
      <label>ms:
        <input
          type="number"
          value={ms}
          onChange={e => setMs(e.target.value)}
        />
      </label>
    </BaseNode>
  );
};