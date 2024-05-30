// Copyright (c) 2021, FOSS United and contributors
// For license information, please see license.txt

frappe.ui.form.on("LMS Quiz", {
	// refresh: function(frm) {
	// 	frm.toggle_display('shuffle_answers');
		
	// },
	
	add_multiple: function(frm) {
        new frappe.ui.form.MultiSelectDialog({
            doctype: "LMS Question", // Replace with your actual DocType
            target: this.cur_frm,
            columns: {'question':null},
            setters: {'question_number':null,'category':null},
            // allow_child_item_selection: 1,
            // child_fieldname: "questions", // child table fieldname, whose records will be shown &amp; can be filtered
            // child_columns: ["questions"], // child item columns to be displayed
            action(selections) {
                // When the user confirms the selection
                $.each(selections, function(index, item) {
                    var child = frm.add_child('questions');
                    child.question = item;
                });
    
                // Refresh the child table and close the dialog
                frm.refresh_field('questions');
            },
           
            onload_post_render: function(frm) {
                console.log("test");
                frm.find(".btn-secondary").addClass("hidden");
            },
        });
        

    },
});

frappe.ui.form.on("LMS Quiz Question", {
	marks: function (frm) {
		total_marks = 0;
		frm.doc.questions.forEach((question) => {
			total_marks += question.marks;
		});
		frm.doc.total_marks = total_marks;
	},
});
