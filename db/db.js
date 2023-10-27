import {CustomerModel} from "../model/CustomerModel.js";
import {ItemModel} from "../model/ItemModel.js";

export var customer_db = [
    new CustomerModel("C001", "Irosh", "Panadura", "0718820985"),
    new CustomerModel("C002", "Maheesha", "Panadura", "0718820985"),
    new CustomerModel("C003", "John Doe", "Panadura", "0718820985"),
    new CustomerModel("C004", "Perera", "Panadura", "0718820985"),
    new CustomerModel("C005", "Pasan", "Panadura", "0718820985")

];
export var item_db = [

    new ItemModel("I001", "Apple", 150.00, 100),
    new ItemModel("I002", "Orange", 250.00, 50),
    new ItemModel("I003", "Banana", 50.00, 80),
    new ItemModel("I004", "Pineapple", 350.00, 80),
    new ItemModel("I005", "Grapes", 120.00, 10)


];


export var order_db = []