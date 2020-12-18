/**
 * Created by Dima on 25.11.2020.
 */

let nodes = [];
let edges = [];

document.is_delete = false;
function draw_tree() {
    document.cy = cytoscape({
        container: document.getElementById('cy'),
        boxSelectionEnabled: false,
        autounselectify: true,
        layout: {
            name: 'dagre'
        },
        zoom: 0.5,
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
    document.cy.nodes().on('click', function(e){
        if (document.is_delete){
            let clickedNode = e.target;
            document.heap.handle_delete(clickedNode.data().id);
        }

    });
}

window.onload = function (e) {
    document.heap = new Heap();
};