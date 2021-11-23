package com.example.miner.model;import java.util.ArrayList;import java.util.List;/** * Tree */public class Tree {    public int VARNUM = 9;    public int size;    NodeJ root;    NodeJ[] nodes;    List<int[]> combinations;    Tree(int size){        this.size = size;        this.nodes = new NodeJ[size];    }    public void addNode(NodeJ node, int index, int[] nbrs) {        nodes[index] = node;        switch(node.data) {            case "x1":                nodes[index].data = Integer.toString(nbrs[0]);                break;            case "x2":                nodes[index].data = Integer.toString(nbrs[1]);                break;            case "x3":                nodes[index].data = Integer.toString(nbrs[2]);                break;            case "x4":                nodes[index].data = Integer.toString(nbrs[3]);                break;            case "x5":                nodes[index].data = Integer.toString(nbrs[4]);                break;            case "x6":                nodes[index].data = Integer.toString(nbrs[5]);                break;            case "x7":                nodes[index].data = Integer.toString(nbrs[6]);                break;            case "x8":                nodes[index].data = Integer.toString(nbrs[7]);                break;            case "x9":                nodes[index].data = Integer.toString(nbrs[8]);                break;            default:                break;        }        if (root == null)            root = nodes[index];    }    public NodeJ findNode(int key) {        NodeJ empty = new NodeJ();        for(NodeJ node : nodes)            if(node.key == key)                return node;        return empty;    }    public int findIndex(int key) {        int empty = -1;        for(int i = 0; i < size; i++)            if(nodes[i].key == key)                return i;        return empty;    }    public void setRelation(int key, int keyLeft, int keyRight) {        int index = findIndex(key);        int indexL = findIndex(keyLeft);        int indexR = findIndex(keyRight);        if (index >= 0) {            nodes[index].left = nodes[indexL];            nodes[index].right = nodes[indexR];        }    }    public void traversePreOrder(NodeJ node) {        if (node != null) {            System.out.print(" " + node.key);            traversePreOrder(node.left);            traversePreOrder(node.right);        }    }    void findPaths(NodeJ node)    {        combinations = new ArrayList<>();        int path[] = new int[1000];        findPathsRecur(node, path, 0);    }    /* Recursive helper function -- given a node, and an array       containing the path from the root node up to but not       including this node, print out all the root-leaf paths.*/    void findPathsRecur(NodeJ node, int path[], int pathLen)    {        if (node == null)            return;        /* append this node to the path array */        path[pathLen] = node.key;        pathLen++;        if (node.left != null && node.right != null) {            findPathsRecur(node.left, path, pathLen);            findPathsRecur(node.right, path, pathLen);        }        else /* it's a leaf, so print the path that led to here  */            if(node.key == 1)                saveArray(path, pathLen);    }    void saveArray(int ints[], int len)    {        int[] combo = new int[len];        int i;        for (i = 0; i < len; i++)        {            //System.out.print(ints[i] + " ");            combo[i] = ints[i];        }        //System.out.println("");        combinations.add(combo);    }}