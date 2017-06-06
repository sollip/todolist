package kr.or.connect.todo.api;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import kr.or.connect.todo.domain.Todo;
import kr.or.connect.todo.service.TodoService;

@RestController
@RequestMapping("/api/todos")
public class TodoController {
	private final TodoService service;
	
	@Autowired
	public TodoController(TodoService service){
		this.service=service;
	}

	@GetMapping
	Collection<Todo> loadlist(){
		System.out.println("loadlist 실행");
		return service.findAll();
	}
	
	//insert
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	Todo create(@RequestBody Todo todo){ //insert
		Todo newTodo=service.create(todo);
		return todo;
	}
	
	//completed
	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	void update(@PathVariable Integer id, @RequestBody Todo todo) {
		todo.setId(id);
		service.update(todo);
	}

	
	//delete
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	void delete(@PathVariable Integer id) {
		service.delete(id);
	}
	
	//deleteCompleted
	@DeleteMapping
	void deleteCompleted(){
		service.deleteCompleted();
	}
}
