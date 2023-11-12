import {customer_db} from "../db/db.js";
import {CustomerModel} from "../model/CustomerModel.js";

var row_index = null;

const customerIdPattern = /^C\d+$/;
const regexCustID = new RegExp(customerIdPattern);

const sriLankanMobileNumberRegex = /^(\+94|0)[1-9][0-9]{8}$/;
const regMobile = new RegExp(sriLankanMobileNumberRegex);

const loadStudentData = () => {
    $('#customer-tbl-body').empty(); // make tbody empty
    customer_db.map((item, index) => {
        let record = `<tr><td class="customer_id">${item.customer_id}</td><td class="name">${item.name}</td><td class="address">${item.address}
        </td><td class="contact">${item.contact}</td></tr>`;
        $("#customer-tbl-body").append(record);
    });
};


// save
$("#save_customer[type='button']").on("click", () => {
    let cust_id = $("#cust_id").val();
    let validity = -1;
    validity = customer_db.findIndex(item => item.customer_id === cust_id);

    if (validity === -1) {
        let name = $("#name").val();
        let address = $("#address").val();
        let contact = $("#contact").val();

        if (cust_id) {
            if (regexCustID.test(cust_id)) {
                if (name) {
                    if (address) {
                        if (contact) {
                            if (regMobile.test(contact)) {


                                let customer_object = new CustomerModel(cust_id, name, address, contact);

                                // save in the db
                                customer_db.push(customer_object);

                                // clear();
                                $("#customer_reset[type='reset']").click();

                                // load student data
                                loadStudentData();
                                toastr.success("Customer successfully added...✅");

                            } else {
                                toastr.error("Invalid Contact Number...❌");
                                return;
                            }
                        } else {
                            toastr.error("Contact Number is empty...❌");
                            return;
                        }
                    } else {
                        toastr.error("Address is empty...❌");
                        return;
                    }
                } else {
                    toastr.error("Name is empty...❌");
                    return;
                }
            } else {
                toastr.error("Invalid Customer ID...❌");
                return;
            }


        } else {
            toastr.error("Customer ID is empty...❌");
            return;
        }


    } else {
        toastr.error("Customer ID already exists...❌");

    }


});

/*update*/
$("#update_customer[type='button']").on("click", () => {

    let cust_id = $("#cust_id").val();
    let name = $("#name").val();
    let address = $("#address").val();
    let contact = $("#contact").val();


    if (cust_id) {
        if (regexCustID.test(cust_id)) {
            if (name) {
                if (address) {
                    if (contact) {
                        if (regMobile.test(contact)) {

                            let customer_object = new CustomerModel(cust_id, name, address, contact);

                            // update the db
                            customer_db.splice(row_index, 1, customer_object);

                            // clear();
                            $("#customer_reset[type='reset']").click();

                            // load student data
                            loadStudentData();
                            toastr.success("Customer successfully updated...✅");

                        } else {
                            toastr.error("Invalid Contact Number...❌");
                            return;
                        }
                    } else {
                        toastr.error("Contact Number is empty...❌");
                        return;
                    }
                } else {
                    toastr.error("Address is empty...❌");
                    return;
                }
            } else {
                toastr.error("Name is empty...❌");
                return;
            }
        } else {
            toastr.error("Invalid Customer ID...❌");
            return;
        }
    }



})

// delete
$("#delete_customer[type='button']").on("click", () => {
    let cust_id = $("#cust_id").val();

    // find item index
    let index = customer_db.findIndex(item => item.customer_id === cust_id);

    // remove the item from the db
    customer_db.splice(index, 1);

    $("#customer_reset[type='reset']").click();

    // load student data
    loadStudentData();
})

$("#customer-tbl-body").on("click", "tr", function () {
    row_index = $(this).index();

    console.log(row_index);

    let cust_id = $(this).find(".customer_id").text();
    let name = $(this).find(".name").text();
    let address = $(this).find(".address").text();
    let contact = $(this).find(".contact").text();

    $("#cust_id").val(cust_id);
    $("#name").val(name);
    $("#address").val(address);
    $("#contact").val(contact);

});
loadStudentData();