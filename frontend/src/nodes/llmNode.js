import BaseNode from '../components/BaseNode';

export const LLMNode = ({ id }) => (
  <BaseNode
    id={id}
    title="LLM"
    inputs={[{ id: `${id}-system` }, { id: `${id}-prompt` }]}
    outputs={[{ id: `${id}-response` }]}
  >
    <span>This is a Large‑Language‑Model node.</span>
  </BaseNode>
);
