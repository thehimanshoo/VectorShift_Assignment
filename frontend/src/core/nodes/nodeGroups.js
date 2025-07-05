
import { NODE_TEMPLATES, createStatefulNode } from './NodeFactory';

export const nodeCreators = {
  // 1. Audio Node (replaces audioNode.js)
  audio: NODE_TEMPLATES.IO(
    'Audio',
    ['file'],
    ['clip'],
    <span>Processes audio</span>
  ),

  // 2. Merge Node (replaces mergeNode.js)
  merge: NODE_TEMPLATES.IO(
    'Merge',
    ['in1', 'in2'],
    ['out'],
    <span>Merges streams</span>
  ),

  // 3. Filter Node (replaces filterNode.js)
  filter: createStatefulNode({
    title: 'Filter',
    initialState: { condition: 'value > 0' },
    inputs: ['input'],
    outputs: ['passed'],
    render: (state, setState) => (
      <input
        value={state.condition}
        onChange={(e) => setState({ condition: e.target.value })}
      />
    )
  }),

  // 4. Math Node (enhanced version)
  math: createStatefulNode({
    title: 'Math',
    initialState: { expr: 'a + b' },
    inputs: ['a', 'b'],
    outputs: ['result'],
    render: (state, setState) => (
      <input
        value={state.expr}
        onChange={(e) => setState({ expr: e.target.value })}
      />
    )
  }),

  // 5. New: CSV Node (demonstration)
  csv: NODE_TEMPLATES.IO(
    'CSV',
    ['data'],
    ['rows', 'columns'],
    <span>Parse CSV data</span>
  ),

  // 6. Video Node 
  video: NODE_TEMPLATES.IO(
    'Video',
    ['stream'],
    ['output'],
    <span>Processes video</span>
  )
};

export const MEDIA_NODES = {
  Audio: {
    title: 'Audio',
    inputs: ['file'],
    outputs: ['clip'],
    content: <span>Processes audio</span>
  }
};