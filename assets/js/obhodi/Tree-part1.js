/**
 * Created by Dima on 25.11.2020.
 */


class Queue {
    constructor() {
        this._oldestIndex = 1;
        this._newestIndex = 1;
        this._storage = {};
    }

    size() {
        return this._newestIndex - this._oldestIndex;
    }

    enqueue(data) {
        this._storage[this._newestIndex] = data;
        this._newestIndex++;
    }

    dequeue() {
        let oldestIndex = this._oldestIndex,
            newestIndex = this._newestIndex,
            deletedData;

        if (oldestIndex !== newestIndex) {
            deletedData = this._storage[oldestIndex];
            delete this._storage[oldestIndex];
            this._oldestIndex++;
            return deletedData;
        }
    }
}

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
        this.pass_result = [];
    }

    search_node(tree_node, value, prev_node = undefined) {
        if (tree_node.value === value) {
            this.search_resultes = { current: tree_node, prev: prev_node };
        } else {
            if (tree_node.left) {
                this.search_node(tree_node.left, value, tree_node);
            }
            if (tree_node.right) {
                this.search_node(tree_node.right, value, tree_node);
            }
        }

    }

    create_node(node, value) {
        if (!node.left || !node.right) {
            if (node.left) {
                node.right = new Node(value)
            } else {
                node.left = new Node(value);
            }
            nodes.push({ data: { id: value } });
            edges.push({ data: { source: node.value, target: value } });
            draw_tree();
        }
    }
    create_root(value) {
        if (!this.root) {
            this.root = new Node(value);
            nodes.push({ data: { id: value } });
            draw_tree();
        }
    }

    handle_create_node(current_value) {
        if ($('.attention-component').length) return;
        this.search_node(this.root, current_value);
        let nodes = this.search_resultes;
        if (!nodes.current.left || !nodes.current.right) {
            new Attention.Prompt({
                title: "Добавление элемента",
                content: "",
                placeholderText: "Введите целое число",
                submitText: "Добавить",
                onSubmit: (component, value) =>{
                    let added_value = parseInt(value);
                    if (added_value && !isNaN(added_value)) {
                        this.search_resultes = '';
                        this.search_node(this.root, added_value);
                        let is_twice_in_tree = this.search_resultes;
                        if(!is_twice_in_tree.current){
                            document.tree.create_node(nodes.current, added_value, nodes.prev);
                        }
                        else{
                            new Attention.Alert({
                                title: "Ошибка!",
                                content: "Такая вершина уже имеется!"
                            });
                        }
                    } else {
                        new Attention.Alert({
                            title: "Ошибка!",
                            content: "Некорректный ввод!"
                        });
                    }
                }
            });
        }
    }

    static get_node_index_in_array(value) {
        for (let node of nodes) {
            if (node.data.id == value)
                return nodes.indexOf(node);
        }
    }

    static get_all_edges_indexes_target(value) {
        for (let edge of edges) {
            if (edge.data.target == value)
                return edges.indexOf(edge);
        }
    }

    handle_delete_node(current_value) {
        this.search_node(this.root, current_value);
        let cur_nodes = this.search_resultes;
        if(cur_nodes.current && cur_nodes.current!==this.root){
            if (cur_nodes.current && cur_nodes.current.left){
                this.handle_delete_node(cur_nodes.current.left.value);
            }
            if (cur_nodes.current && cur_nodes.current.right){
                this.handle_delete_node(cur_nodes.current.right.value);
            }
            if (cur_nodes.prev.right === cur_nodes.current)
                cur_nodes.prev.right = undefined;
            else {
                cur_nodes.prev.left = undefined;
            }
            let node_index = Tree.get_node_index_in_array(current_value);
            nodes.splice(node_index, 1);
            let edge_index = Tree.get_all_edges_indexes_target(current_value);
            edges.splice(edge_index, 1);
        }
    }


    preOrderTravers(root) {
        if (root) {
            this.pass_result.push(root.value);
            this.preOrderTravers(root.left);
            this.preOrderTravers(root.right);
        }
    }

    inOrderTravers(root) {
        if (root) {
            this.inOrderTravers(root.left);
            this.pass_result.push(root.value);
            this.inOrderTravers(root.right);
        }
    }

    postOrderTravers(root) {
        if (root) {
            this.postOrderTravers(root.left);
            this.postOrderTravers(root.right);
            this.pass_result.push(root.value);
        }
    }

    obhod_v_width() {
        let q = new Queue();
        q.enqueue(this.root);
        while (q.size()) {
            let node = q.dequeue();
            this.pass_result.push(node.value);
            if (node.left)
                q.enqueue(node.left);
            if (node.right)
                q.enqueue(node.right);
        }
    }
}