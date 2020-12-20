/**
 * Created by Dima on 25.11.2020.
 */


class Heap {
    constructor() {
        this.heap = [];
    };

    add_item(item) {
        let i = this.heap.length;
        this.heap.push(item);
        let parent = Math.round((i - 1) / 2);
        while (parent >= 0 && i > 0) {
            if (this.heap[i].value > this.heap[parent].value) {
                let temp = this.heap[i];
                this.heap[i] = this.heap[parent];
                this.heap[parent] = temp;
            }
            i = parent;
            parent = Math.round((i - 1) / 2);
        }
    }

    array_to_piramid(arr){

        for(let elem of arr){
            this.create_item(elem)
        }
        this.heap_to_graph();
    }

    create_item(label) {
        let node = new Node(label);
        this.add_item(node);

    }

    handle_create_node() {
        if ($('.attention-component').length) return;
        new Attention.Prompt({
            title: "Добавление элемента",
            content: "",
            placeholderText: "Введите целое число",
            submitText: "Добавить",
            onSubmit: (component, value)=> {
                let added_value = parseInt(value);
                if (added_value && !isNaN(added_value)) {
                    document.heap.create_item(added_value);
                    this.heap_to_graph();
                    } else {
                    new Attention.Alert({
                        title: "Ошибка!",
                        content: "Некорректный ввод!"
                    });
                }
            }
        });
    }

    search_node(label) {
        this.heap = [];
        for (let node of this.heap) {
            if (node.label === label)
                return node;
        }
        return false;
    }

    delete_node(node) {
        let delete_index = this.heap.indexOf(node);
        this.heap.splice(delete_index, 1);
        this.heapify(delete_index);
        this.heap_to_graph();
    }

    heap_to_graph() {
        nodes = [];
        edges = [];
        nodes.push({data: {id: this.heap[0].label}});
        for (let i = 1; i < this.heap.length; i++) {
            let parent_index = Math.round((i) / 2)-1;
            nodes.push({data: {id: this.heap[i].label}});
            edges.push({data: {source: this.heap[parent_index].label, target: this.heap[i].label}});

        }
        draw_tree();
    }

    heapify(index) {
        let left = 2 * index + 1;
        let right = 2 * index + 2;
        if (left < this.heap.length) {
            if (this.heap[index] < this.heap[left]) {
                let temp = this.heap[index];
                this.heap[index] = this.heap[left];
                this.heap[left] = temp;
                this.heapify(left);
            }
        }
        if (right < this.heap.length) {
            if (this.heap[index] < this.heap[right]) {
                let temp = this.heap[index];
                this.heap[index] = this.heap[right];
                this.heap[right] = temp;
                this.heapify(right);
            }
        }
    }


    handle_delete(label) {
        let node = this.search_node(label);
        this.delete_node(node);
        draw_tree();
    }
}
class Node {
    constructor(value) {
        this.value = value;
        this.label = value;
    }

}