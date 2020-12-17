/**
 * Created by Dima on 25.11.2020.
 */

let nodes = [];
let edges = [];

function draw_tree() {
    document.cy = cytoscape({
        container: document.getElementById('cy'),
        boxSelectionEnabled: false,
        autounselectify: true,
        minZoom: 1e-100,
        maxZoom: 1e50,
        layout: {
            name: 'dagre'
        },

        style: [
            {
                selector: 'node',
                style: {
                    'content': 'data(id)',
                    'text-opacity': 0.5,
                    'text-valign': 'center',
                    'text-halign': 'right',
                    'background-color': '#11479e'
                }
            },

            {
                selector: 'edge',
                style: {
                    'curve-style': 'bezier',
                    'width': 4,
                    'target-arrow-shape': 'triangle',
                    'line-color': '#9dbaea',
                    'target-arrow-color': '#9dbaea'
                }
            }
        ],

        elements: {
            nodes: nodes,
            edges: edges,
        },
    });
    document.cy.nodes().on('mousedown', function(e){
        let clickedNode = e.target;
        document.tree.handle_create_node(parseInt(clickedNode.data().id));
    });
    document.cy.nodes().on('cxttap', function(e){
        let clickedNode = e.target;
        document.tree.handle_delete_node(parseInt(clickedNode.data().id));
    });
    document.cy.center();
    if(nodes.length===1){
        document.cy.zoom(2);
    }
}



window.onload = function (e) {
    document.tree = new Tree();
    document.tree.create_root(1);
};