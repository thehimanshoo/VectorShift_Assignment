import { useState } from 'react';
import BaseNode from '../components/BaseNode';
export const FilterNode = ({ id }) => {
  const [cond, setCond] = useState('value > 0');
  return (
    <BaseNode
      id={id}
      title="Filter"
      inputs={[{ id: `${id}-input` }]}
      outputs={[{ id: `${id}-passed` }]}
    >
      <input value={cond} onChange={e => setCond(e.target.value)} />
    </BaseNode>
  );
};