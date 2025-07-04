import { useState } from 'react';
import BaseNode from '../components/BaseNode';

export const MathNode = ({ id }) => {
  const [expr, setExpr] = useState('a + b');
  return (
    <BaseNode
      id={id}
      title="Math"
      inputs={[{ id: `${id}-a` }, { id: `${id}-b` }]}
      outputs={[{ id: `${id}-result` }]}
    >
      <input value={expr} onChange={e => setExpr(e.target.value)} />
    </BaseNode>
  );
};