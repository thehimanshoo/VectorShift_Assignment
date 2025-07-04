import BaseNode from '../components/BaseNode';
export const MergeNode = ({ id }) => (
  <BaseNode
    id={id}
    title="Merge"
    inputs={[{ id: `${id}-in1` }, { id: `${id}-in2` }]}
    outputs={[{ id: `${id}-out` }]}
  >
    <span>Merges two streams.</span>
  </BaseNode>
);