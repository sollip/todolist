(function (window) {
	'use strict';
	// Your starting point. Enjoy the ride!
	var count=0;
	
	loadlist();
	addlist();
	deletelist();
	completelist();
	filterlist();
	clearCompleted();
	
})(window);

function addCompletedTodo(data){
	$(".todo-list").prepend('<li class="completed">' +
			'<div class="view">' +
			'<input class="toggle" type="checkbox" checked id="'+data.id+'" >' +
			'<label>'+data.todo+'</label>' +
			'<button class="destroy" ></button>' +
			'</div>' +
			'<input class="edit" value="Rule the web">' +
	'</li>');
}

function addTodo(data){
	$(".todo-list").prepend('<li>' +
			'<div class="view">' +
			'<input class="toggle" type="checkbox" id="'+data.id+'">' +
			'<label>'+data.todo+'</label>' +
			'<button class="destroy" ></button>' +
			'</div>' +
			'<input class="edit" value="Rule the web">' +
	'</li>');
}

function loadlist(){
	
	$.ajax({
		url: "http://localhost:8080/api/todos",
		type:"GET",
		dataType: "JSON",
		success : function(data){
			count=0;
			for(var i=0;i<data.length;i++){
				if(data[i].completed=='1'){
					addCompletedTodo(data[i]);
				}else{
					addTodo(data[i]);
					count=count+1;
				}
			}
			$(".todo-count").text(count);
		}
	});
}

function addlist(){
	$(".new-todo").on('keypress',function(event){
		if (event.which == 13) {
			var todo_text=$(".new-todo").val();
			if(todo_text!=''){
				var data = new Object();
				data.todo=todo_text;
				data.completed=0;
				$.ajax({
					url:"http://localhost:8080/api/todos",
					type:"POST",
					contentType:"application/json",
					data: JSON.stringify(data),
					success : function(data){
						addTodo(data);
					}
				});
				$(".new-todo").val("");
				count=count+1;
				$(".todo-count").text(count);
			}
		}
	});
}

function deletelist(){
	$('.todo-list').on('click','.destroy',function(event){
		var id=$(this).parent().find("input").attr('id');	
		$.ajax({
			url:"http://localhost:8080/api/todos/"+id,
			type:"DELETE",
			success : function(data){
				$(event.target).parent().parent().remove();
			}
		});
		//완료된 일을 삭제 할때는 count불변
		if(!$(this).parent().find("input").is(":checked")){
			count=count-1;
			$(".todo-count").text(count);
		}
	});
}

function completelist(){
	$('.todo-list').on('click','.toggle',function(event){
		$(this).parent().parent().toggleClass('completed');
		
		var id=$(this).parent().find("input").attr('id');
		var completed=$(this).is(":checked") ? 1 : 0;
		var data=new Object();
		data.completed=completed;
		$.ajax({
			url:"http://localhost:8080/api/todos/"+id,
			type:"PUT",
			contentType:"application/json",
			data: JSON.stringify(data),
			success : function(data){
			}
		});
		if(completed){
			count=count-1;
			$(".todo-count").text(count);
		}else{
			count=count+1;
			$(".todo-count").text(count);
		}
	});
}

function filterlist(){
	$('.filters').on('click','a',function(event){
		var filter = $(this).text();
		if(filter=="All"){
			$("#all").addClass("selected");
			$("#active").removeClass("selected");
			$("#completed").removeClass("selected");
			
			$(".todo-list *").remove();
			loadlist();
		}else if(filter=="Active"){
			$("#all").removeClass("selected");
			$("#active").addClass("selected");
			$("#completed").removeClass("selected");
			
			$(".todo-list *").remove();
			activeFilter();
		}else if(filter=="Completed"){
			$("#all").removeClass("selected");
			$("#active").removeClass("selected");
			$("#completed").addClass("selected");
			
			$(".todo-list *").remove();
			completedFilter();
		}
	});
}

function activeFilter(){
	$.ajax({
		url: "http://localhost:8080/api/todos",
		type:"GET",
		dataType: "JSON",
		success : function(data){
			for(var i=0;i<data.length;i++){
				if(data[i].completed=='0'){
					addTodo(data[i]);
				}
			}
		}
	});
}

function completedFilter(){
	$.ajax({
		url: "http://localhost:8080/api/todos",
		type:"GET",
		dataType: "JSON",
		success : function(data){
			for(var i=0;i<data.length;i++){
				if(data[i].completed=='1'){
					addCompletedTodo(data[i]);
				}
			}
		}
	});
}

function clearCompleted(){
	$(".clear-completed").on("click",function(event){
		$.ajax({
			url:"http://localhost:8080/api/todos",
			type:"DELETE",
			success : function(data){
				$('.todo-list .completed').remove();
			}
		});
	});
}
