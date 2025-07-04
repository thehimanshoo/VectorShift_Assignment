from fastapi import FastAPI, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any
import json
from collections import defaultdict, deque

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)

def is_dag(edges: List[Dict[str, str]]) -> bool:
    """Kahn’s algorithm."""
    adj = defaultdict(list)
    indeg = defaultdict(int)

    for e in edges:
        s, t = e['source'], e['target']
        adj[s].append(t)
        indeg[t] += 1
        indeg.setdefault(s, 0)

    q = deque([n for n, d in indeg.items() if d == 0])
    visited = 0
    while q:
        u = q.popleft()
        visited += 1
        for v in adj[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                q.append(v)
    return visited == len(indeg)

@app.post('/pipelines/parse')
async def parse_pipeline(request: Request, pipeline: str = Form(...)):
    print("Raw Form Received:")
    print("pipeline =", pipeline)

    try:
        data = json.loads(pipeline)
    except Exception as e:
        print("🚨 JSON parse error:", e)
        return {"error": f"Could not parse JSON: {str(e)}"}

    nodes = data.get('nodes', [])
    edges = data.get('edges', [])
    return {
        'num_nodes': len(nodes),
        'num_edges': len(edges),
        'is_dag': is_dag(edges),
    }

@app.get("/")
async def root():
    return {"Ping": "Pong"}

