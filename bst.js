class Node{
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree{
    constructor(){
        this.root = null;
    }

    buildTree(array){
        if(array.length == 1){
            return new Node(array);
        }

        const sortedArray = mergeSort(array);
        const half = Math.ceil(sortedArray.length / 2);
        const firstHalf = sortedArray.slice(0, half);
        const secondHalf = sortedArray.slice(half);
        
        const node = new Node(sortedArray[half]);
        node.left = this.buildTree(firstHalf);
        node.right = this.buildTree(secondHalf);

        return node;
    }

    insert(value){
        this.root = this.insertVal(root, value);
    }

    insertVal(root, value){
        if(root == null){
            root = new Node(value);
            return root;
        } 

        if(value < root.value){
            root.left = this.insertVal(root.left, value);
        } else if(value > root.value){
            root.right = this.insertVal(root.right, value);
        }

        return root;
    }

    delete(value){
        this.root = this.deleteVal(root, value);
    }

    deleteVal(root, value){
        if(root === null){
            return root;
        }

        if(value < root.value){
            root.left = this.deleteVal(root.left, value);
        } else if(value > root.value){
            root.right = this.deleteVal(root.right, value);
        } else {
            if(root.left === null){
                return root.right;
            } else if(root.right === null){
                return root.left;
            }

            root.value = this.minValue(root.right);

            root.right = this.deleteVal(root.right, root.value);
        }

        return root; 
    }

    minValue(node){
        let minv = node.value;

        while(node.left !== null){
            minv = node.left.value;
            node = node.left;
        }

        return minv;
    }

    find(root = this.root, value){
        if(root === null || root.value === value){
            return root;
        }

        if(value < root.value){
            root.left = this.find(root.left, value);
        } else if(value > root.value){
            root.right = this.find(root.right, value);
        } 
    }

    levelOrder(arr = [], queue = [], root = this.root){
        if(root === null) return;

        arr.push(root.value);

        queue.push(root.left);
        queue.push(root.right);

        while(queue.length){
            const level = queue[0];
            queue.shift();
            this.levelOrder(arr, queue, level);
        }

        return arr;
    }

    inOrder(arr = [], root = this.root){
        if(root === null) return;

        this.inOrder(arr, root.left);
        arr.push(root.value);
        this.inOrder(arr, root.right);

        return arr;
    }

    preOrder(arr = [], root = this.root){
        if(root === null) return;

        arr.push(root.value);
        this.preOrder(arr, root.left);
        this.preOrder(arr, root.right);

        return arr;
    }

    postOrder(arr = [], root = this.root){
        if(root === null) return;

        this.postOrder(arr, root.left);
        this.postOrder(arr, root.right);
        arr.push(root.value);

        return arr;
    }

    height(node, root = this.root, height = 0){
        if(root === null) return `Height: ${height}`;

        if(node === root) height = 0;

        if(node.value < root.value){
            return this.height(node, root.left, height += 1);
        } else {
            return this.height(node, root.right, height += 1);
        }
    }

    depth(node, root = this.root, depth = 0){
        if(root === null) return;

        if(node === root) return `Depth: ${depth}`;

        if(node.value < root.value){
            return this.depth(node, root.left, depth += 1);
        } else {
            return this.depth(node, root.right, depth += 1);
        }
    }

    isBalanced(root = this.root) {
        const lHeight = this.height(root.left);
        const rHeight = this.height(root.right);
        const diff = Math.abs(lHeight - rHeight);
        return diff < 2 ? 'true' : 'false';
    }

    rebalance(root = this.root) {
        let arr = this.levelOrder([], [], root);
        arr.sort((a, b) => a - b);
        return this.root = this.buildTree(arr);
    }
};

function mergeSort(array){

    if(array.length == 0){
        return 'Error | Empty Array entered'
    } else if (array.length == 1){
        return array;
    }

    const half = Math.ceil(array.length / 2);
    const firstHalf = array.slice(0, half);
    const secondHalf = array.slice(half);

    return merge(mergeSort(firstHalf), mergeSort(secondHalf));



    function merge(firstArray, secondArray){
        let mergedArr = [];
        let elementCount = firstArray.length += secondArray.length;
        let j = 0;

        for (let i = 0; mergedArr.length < elementCount;){
            if(mergedArr.includes(firstArray[i])){
                i++
                elementCount -= 1;
            } else if(mergedArr.includes(secondArray[j])){
                j++
                elementCount -= 1;
            }

            if(firstArray[i] < secondArray[j] || secondArray[j] == undefined){
                mergedArr.push(firstArray[i]);
                i++;
            } else {
                mergedArr.push(secondArray[j]);
                j++;
            }
        }
        
        return mergedArr;
    }

};

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
    return;
    }
    if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};


const tree = new Tree();
tree.root = tree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
const root = tree.root;
tree.insert(14);
// tree.delete(9);
console.log(tree.find(324))
console.log(tree.levelOrder())
console.log(tree.inOrder())
console.log(tree.preOrder())
console.log(tree.postOrder())
console.log(tree.height(324))
console.log(tree.depth(324))
console.log(tree.isBalanced())
console.log(tree.rebalance())

console.log(root)
prettyPrint(root, prefix = "", isLeft = true);