// 1. Auto-generate connector IDs
export const genConnectorIds = (id, names, type) => 
  names.map(name => ({ id: `${id}-${type}-${name}` }));

// 2. Text processing (for TextNode)
export const extractVariables = (text) => 
  [...new Set(text.match(/\{\{(\w+)\}\}/g))].map(v => v.slice(2, -2));

// 3. Handle positioning constants
export const HANDLE_STYLES = {
  left: { position: 'left', type: 'target' },
  right: { position: 'right', type: 'source' }
};