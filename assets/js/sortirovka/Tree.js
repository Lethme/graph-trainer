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

    create_root() {
        let value = prompt('Введите значение вершины:');
        if (value) {
            if (value !== '') {
                this.heap.push(new Node(value));
                this.heap_to_graph();
                this.create_menu();
            }
            else {
                alert("Недопустимый ввод!");
            }
        }
    }

    search_node(label) {
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

    view_form_add() {
        let value = prompt('Введите значение вершины:');
        if (value) {
            if (value !== '') {
                this.create_item(value);
                this.heap_to_graph();
            }
            else {
                alert("Недопустимый ввод!");
            }
        }
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

    create_menu() {
        $('.control').empty();
        $('.control').append(`
                <p><a onclick="document.heap.view_form_add()" >Добавить вершину</a></p>
                <p><a class="delete-btm" onclick="document.heap.start_delete()" >Режим удаления</a></p>
                <p><a onclick="document.heap.handle_search()" >Поиск</a></p>
                <p><a onclick="document.heap.search_delete()" >Найти и удалить</a></p>`);
    }

    handle_search(){
        let value = prompt('Введите значение искомой вершины:');
        if (value) {
            if (value !== '') {
                if (this.search_node(value)){
                    alert("Есть такая вершина!");
                }
                else {
                    alert("Нет такой вершины!");
                }
            }
            else {
                alert("Недопустимый ввод!");
            }
        }
    }

    start_delete() {
        document.is_delete = true;
        $('.delete-btm')[0].onclick = function () {
            document.heap.stop_delete();
        };
        $('.delete-btm')[0].innerText = "Отключить режим удаления";
    }

    stop_delete() {
        document.is_delete = false;
        $('.delete-btm')[0].onclick = function () {
            document.heap.start_delete();
        };
        $('.delete-btm')[0].innerText = "Режим удаления";
    }

    handle_delete(label) {
        let node = this.search_node(label);
        if (node !== this.heap[0]) {
            let node_parent_index  = this.heap.indexOf(this.search_node(label));
            node_parent_index = Math.round((node_parent_index-1)/2);
            let left_parent_index = this.heap.indexOf(this.search_node(label))-1;
            left_parent_index = Math.round((left_parent_index-1)/2);
            if (this.heap.indexOf(this.search_node(label))!==this.heap.length-1){
                let right_parent_index = this.heap.indexOf(this.search_node(label))+1;
                right_parent_index = Math.round((right_parent_index-1)/2);
                if (this.heap[node_parent_index]===this.heap[right_parent_index] ||
                    this.heap[node_parent_index]!==this.heap[left_parent_index]){
                    alert("Удаляемая вершина - левый потомок");
                }
                else{
                    alert("Удаляемая вершина - правый потомок");
                }
            }
            else {
                if (this.heap[node_parent_index]!==this.heap[left_parent_index]){
                    alert("Удаляемая вершина - левый потомок");
                }
                else{
                    alert("Удаляемая вершина - правый потомок");
                }
            }
        }
        else {
            alert("Удаляемая вершина - корень!");
        }
        this.delete_node(node);

    }
    search_delete() {
        let value = prompt('Введите значение удаляемой вершины:');
        if (value) {
            if (value !== '') {
                let node = this.search_node(value);
                if (!node) {
                    alert("Ничего не найдено!");
                }
                else {
                    while (node){
                        this.handle_delete(node);
                        node = this.search_node(value);
                    }
                }
            }
            else {
                alert("Недопустимый ввод!");
            }
        }
    }
}
class Node {
    constructor(value) {
        this.value = value;
        this.label = value;
    }

}