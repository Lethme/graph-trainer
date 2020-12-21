/**
 * Created by Dima on 25.11.2020.
 */


/**
 * class tree node
 */
class Node {
    constructor(value) {
        this.value = value;
        //pointer to left child
        this.left = undefined;
        //pointer to right child
        this.right = undefined;
    }

}
/**
 * class tree
 */
class Tree {

    constructor() {

        //pointer to tree root
        this.root = '';

        //contains search results 
        this.search_results = '';
    }

    /**
     *
     * @param tree_node as Node
     * @param value as int
     * @param prev_node as Node|undefined
     */
    search_node(tree_node, value, prev_node = undefined) {

        //if the element is found, write the result in search_results
        if (tree_node.value === value) {
            this.search_results = { current: tree_node, prev: prev_node };
        } else {

            //search in left child
            if (tree_node.left) {
                this.search_node(tree_node.left, value, tree_node);
            }
            //search in right child
            if (tree_node.right) {
                this.search_node(tree_node.right, value, tree_node);
            }
        }

    }

    /**
     *
     * @param node as Node
     * @param value as int
     */
    create_node(node, value) {
        if (!node.left || !node.right) {

            if (node.left) {
                node.right = new Node(value)
            } else {
                node.left = new Node(value);
            }

            //add node in graph data
            nodes.push({ data: { id: value } });

            //add edge in graph data
            edges.push({ data: { source: node.value, target: value } });
            draw_tree();
        }
    }

    /**
     *
     * @param value as int
     */
    create_root(value) {
        if (!this.root) {

            this.root = new Node(value);
            nodes.push({ data: { id: value } });
            draw_tree();
        }
    }

    /**
     *
     * @param current_value as int
     */
    handle_create_node(current_value) {

        if ($('.attention-component').length)
            return;

        this.search_node(this.root, current_value);
        let nodes = this.search_results;

        if (!nodes.current.left || !nodes.current.right) {

            //create new window with text inputs
            new Attention.Prompt({
                title: "Добавление элемента",
                content: "",
                placeholderText: "Введите целое число",
                submitText: "Добавить",
                onSubmit: (component, value) =>{
                    let added_value = parseInt(value);

                    //if value correct
                    if (added_value && !isNaN(added_value)) {
                        this.search_results = '';

                        //check twice
                        this.search_node(this.root, added_value);
                        let is_twice_in_tree = this.search_results;
                        if(!is_twice_in_tree.current){
                            document.tree.create_node(nodes.current, added_value, nodes.prev);
                        }
                        else{

                            //throw error
                            new Attention.Alert({
                                title: "Ошибка!",
                                content: "Такая вершина уже имеется!"
                            });
                        }
                    } else {

                        //throw error
                        new Attention.Alert({
                            title: "Ошибка!",
                            content: "Некорректный ввод!"
                        });
                    }
                }
            });
        }
    }


    /**
     * @param value as int
     * @returns {number|Number}
     */
    static get_node_index_in_array(value) {
        for (let node of nodes) {
            if (node.data.id == value)
                return nodes.indexOf(node);
        }
    }

    /**
     *
     * @param value as int
     * @returns {number|Number}
     */
    static get_all_edges_indexes_target(value) {
        for (let edge of edges) {
            if (edge.data.target == value)
                return edges.indexOf(edge);
        }
    }

    /**
     *
     * @param node as Node
     */
    delete_node(node){
        if(node){
            this.delete_node(node.left);
            this.delete_node(node.right);
        }
    }

    /**
     *
     * @param current_value as int
     */
    handle_delete_node(current_value) {

        this.search_node(this.root, current_value);
        let cur_nodes = this.search_results;

        //if current node not a tree root
        if(cur_nodes.current && cur_nodes.current!==this.root){

            //recurs delete left child
            if (cur_nodes.current && cur_nodes.current.left){
                this.handle_delete_node(cur_nodes.current.left.value);
            }

            //recurs delete right child
            if (cur_nodes.current && cur_nodes.current.right){
                this.handle_delete_node(cur_nodes.current.right.value);
            }

            //delete nodes
            if (cur_nodes.prev.right === cur_nodes.current)
                cur_nodes.prev.right = undefined;
            else {
                cur_nodes.prev.left = undefined;
            }

            //delete node from a graph
            let node_index = Tree.get_node_index_in_array(current_value);
            nodes.splice(node_index, 1);

            //delete edges from a graph
            let edge_index = Tree.get_all_edges_indexes_target(current_value);
            edges.splice(edge_index, 1);
        }
    }
}