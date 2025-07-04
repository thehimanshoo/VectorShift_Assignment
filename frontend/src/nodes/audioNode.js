import BaseNode from '../components/BaseNode';
export const AudioNode = ({ id }) => (
  <BaseNode
    id={id}
    title="Audio"
    inputs={[{ id: `${id}-file` }]}
    outputs={[{ id: `${id}-clip` }]}
  >
    <span>Processes audio.</span>
  </BaseNode>
);
