/**
 * Created by Dima on 25.11.2020.
 */



class Node {
    constructor(value) {
        this.value = value;
        this.left = undefined;
        this.right = undefined;
    }

}
class Tree {
    constructor() {
        this.root = '';
        this.search_resultes = '';
    }

    search_node(tree_node, value, prev_node = undefined) {
        if (tree_node.value === value) {
            this.search_resultes = {current:tree_node, prev:prev_node};
        }
        else {
            if (tree_node.left){
                this.search_node(tree_node.left, value, tree_node);
            }
            if (tree_node.right){
                this.search_node(tree_node.right, value,tree_node);
            }
        }

    }

    create_node(node, value){
        if (!node.left || !node.right){
            if(node.left){
                node.right = new Node(value)
            }
            else{
                node.left = new Node(value);
            }
            nodes.push({data:{id:value}});
            edges.push({data: {source: node.value, target: value}});
            draw_tree();
        }
    }

    create_root(value){
        if (!this.root) {
            this.root=new Node(value);
            nodes.push({data:{id:value}});
            draw_tree();
        }
    }

    handle_create_node(current_value){
        this.search_node(this.root,current_value);
        let nodes = this.search_resultes;
        if (!nodes.current.left || !nodes.current.right){
            let added_value = parseInt(prompt('Введите число для добавления в дерево'));
            if (added_value && added_value!=NaN){
                this.create_node(nodes.current,added_value,nodes.prev);
            }
            else {
                alert("Некорректный ввод!");
            }
        }
    }

    static get_node_index_in_array(value){
        for (let node of nodes){
            if (node.data.id == value)
                return nodes.indexOf(node);
        }
    }

    static get_all_edges_indexes_source(value){
        let all_indexes = [];
        for (let edge of edges){
            if (edge.data.source == value)
                all_indexes.push(edges.indexOf(edge));
        }
        return all_indexes;
    }


    static get_all_edges_indexes_target(value){
        for (let edge of edges){
            if (edge.data.target == value)
                return edges.indexOf(edge);
        }
    }

    handle_delete_node(current_value){
        this.search_node(this.root,current_value);
        let cur_nodes = this.search_resultes;
        if (!cur_nodes.current.left && !cur_nodes.current.right){
            if (cur_nodes.prev.right===cur_nodes.current)
                cur_nodes.prev.right = undefined;
            else {
                cur_nodes.prev.left = undefined;
            }
            let node_index = Tree.get_node_index_in_array(current_value);
            nodes.splice(node_index,1);
            let edge_index = Tree.get_all_edges_indexes_target(current_value);
            edges.splice(edge_index,1);
            draw_tree();
        }
    }
}