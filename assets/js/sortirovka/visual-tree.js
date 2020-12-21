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
                    'background-color': '#11479e',
                    'width': 20,
                    'height': 20,
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

        wheelSensitivity: 0.3,
        elements: {
            nodes: nodes,
            edges: edges,
        },
    });
    document.cy.nodes().on('mouseup', function(e){
        document.heap.handle_create_node();
    });
    document.cy.nodes().on('tap', function(e){
        document.heap.handle_create_node();
    });
    document.cy.nodes().on('cxttapend', function(e){
        let clickedNode = e.target;
        document.heap.handle_delete(parseInt(clickedNode.data().id));
        draw_tree();
    });
    document.cy.center();
    if(nodes.length===1){
        document.cy.zoom(2);
    }
}

window.onload = function (e) {
    document.heap = new Heap();
    $('.btn-link').eq(0).on('click', function() {
        let current_array = $('.data-tree-array').eq(0).val();
        current_array = current_array.split(',');
        let bad_data = false;
        for(let elem of current_array){
            if(isNaN(elem)){
                bad_data=true;
                break;
            }
        }
        if(bad_data){
            new Attention.Alert({
                title: "Ошибка!",
                content: "Некорректный ввод!"
            });
        }
        else {
            current_array = current_array.map(item=>parseInt(item));
            document.heap.array_to_piramid(current_array);
        }
    });
    $('.btn-link').eq(1).on('click', function() {
        if(window.location.href.indexOf("trenajor-2")===-1){
            window.location.href = "trenajor-2.html";
        }
        else {
            window.location.href = "trenajor.html";
        }
    });

};